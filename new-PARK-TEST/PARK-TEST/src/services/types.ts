export enum TaskStatus {
  "task_in_progress",
  "upload_in_progress",
  "upload_complete",
  "task_complete",
  "at_instructions",
  "at_tutorial",
}
export enum Task {
  resting_face = "resting_face",
  quick_brown_fox = "quick_brown_fox",
  finger_tapping_left = "finger_tapping_left",
  finger_tapping_right = "finger_tapping_right",
  open_fist_left = "open_fist_left",
  open_fist_right = "open_fist_right",
  flip_palm_right = "flip_palm_right",
  flip_palm_left = "flip_palm_left",
  extend_arm = "extend_arm",
  ahhhh = "ahhhh",
  ooooo = "ooooo",
  eeeee = "eeeee",
  eye_gaze = "eye_gaze",
  reverse_count = "reverse_count",
  head_pose = "head pose",
  smile = "smile",
  disgust = "disgust",
  surprise = "surprise",
  tongue_twister = "tongue_twister",
  nose_touch_left = "nose_touch_left",
  nose_touch_right = "nose_touch_right",
}
export interface Recorder {
  start: () => Promise<void>;
  stop: () => Promise<File>;
  end: (file: File) => Promise<void>;
  retry: () => Promise<void>;
  stream: MediaStream | null;
}

export interface User {
  userID: string;
  email?: string;
  name?: string;
}

export enum InferenceTask {
  quick_brown_fox = "quick_brown_fox",
  facial_mimicry = "facial_mimicry",
  finger_tapping = "finer_tapping",
}

export interface InferenceResponse {
  confidence: number;
  prediction: number;
}
