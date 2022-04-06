import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import RecordRTC from "recordrtc";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentTaskState, sessionState } from "./state";
import { TaskStatus, Recorder } from "./types";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const useRecorder = (): Recorder => {
  const storage = firebase.storage();
  const db = firebase.firestore();
  const auth = firebase.auth();

  if (!auth.currentUser)
    throw new Error("Current user not found. Please authenticate an user.");
  const { uid } = auth.currentUser;

  const session = useRecoilValue(sessionState);
  const setCurrentTaskStatus = useSetRecoilState(currentTaskState);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);

  const start = async () => {
    const media = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const recorder = new RecordRTC(media, { type: "video" });

    // add 1.5 second delay to ensure sync in macOS
    await sleep(1500);
    recorder.startRecording();
    setRecorder(recorder);
    setStream(media);
  };

  const retry = async () => {
    if (!recorder)
      throw new Error(
        "Recorder is null. Did you forget to start the recorder?"
      );
    await closeStream();
    recorder.stopRecording();
    setRecorder(null);
    setStream(null);
  };

  // closes webcam/mic
  const closeStream = () => {
    if (!stream)
      throw new Error("Stream is null. Did you forget to start the recorder?");
    return Promise.all(
      stream
        .getTracks()
        .map((track) => new Promise<void>((resolve) => resolve(track.stop())))
    );
  };

  const stop = async () => {
    if (!recorder || !stream)
      throw new Error(
        "Recorder/Stream is null. Did you forget to start the recorder?"
      );
    await closeStream();
    return new Promise<File>((resolve) => {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const date = session.startDate?.toISOString();

        // IMPORTANT: filename must be of following format
        const filename = `${date}_${uid}_${session.currentTask}`;
        const file = new File([blob], filename, { type: "video/webm" });

        resolve(file);
      });
    });
  };

  const uploadTaskFile = async (file: File) => {
    const ref = storage.ref(`/sessions/${file.name}.webm`);
    if (!session.startDate)
      throw new Error("start date is not set in session.");

    try {
      await ref.put(file);
      // IMPORTANT: userID, recordDate, location must be present so that task videos can be found later.
      await db.doc(`/sessions/${file.name}`).set({
        userID: uid,
        recordDate: session?.startDate,
        location: ref.fullPath,
        task: session.currentTask,
      });

      setCurrentTaskStatus(TaskStatus.upload_complete);
    } catch (error) {
      console.error(error);
    }
  };

  const end = async (file: File) => {
    setCurrentTaskStatus(TaskStatus.upload_in_progress);
    await uploadTaskFile(file);
    setRecorder(null);
    setStream(null);
  };

  return {
    start,
    stop,
    end,
    retry,
    stream,
  };
};
