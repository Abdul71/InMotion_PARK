import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Step,
  Stepper,
  StepLabel,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { Prompt } from "react-router";
import { useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Task, TaskStatus } from "../services/types";
import { taskToContent } from "../services/tasks";
import { Feedback, Panel, TaskManager } from "../components";
import { sessionState, authState } from "../services/state";
import firebase from "firebase/app";
import "firebase/auth";

const useStyle = makeStyles((theme) => ({
  paper: {
    width: "100%",
    height: "100%",
  },
  logoutButton: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  navigation: {
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    alignSelf: "flex-end",
    borderRadius: 0,
  },
}));

const SessionPage: React.FC = () => {
  const classes = useStyle();
  const auth = firebase.auth();
  const history = useHistory();
  const setAuth = useSetRecoilState(authState);
  let isLoggedIn = true;
  const [activeStep, setActiveStep] = useState(0);
  const taskList = Array.from(taskToContent.keys());
  const [session, setSession] = useRecoilState(sessionState);
  const currentTaskProgress = session.taskProgress[session.currentTask];
  

  // trigger warning if user attempts to leave session page
  useEffect(() => {
    window.onbeforeunload = () => true;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  useEffect(() => {
    // set end date once all tasks are complete
    if (activeStep == taskToContent.size)
      setSession({ ...session, endDate: new Date() });
    // move on to next task
    if (currentTaskProgress == TaskStatus.task_complete) {
      setSession({
        ...session,
        currentTask: taskList[activeStep + 1],
      });
      setActiveStep(activeStep + 1);
    }
  }, [currentTaskProgress]);

  const checkTaskStatus = (task: Task, status: TaskStatus) => {
    return session.taskProgress[task] == status;
  };

  const signout = () => {
    auth.signOut().then(() => {
      setAuth(null);
      isLoggedIn = false;
      history.push("/");
      console.log(isLoggedIn);
    });
  };

  const renderTasks = () => {
    return (
      <Grid container>
        <Panel xs={2}>
          <Paper className={classes.paper}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {taskList.map((task) => {
                return (
                  <Step
                    key={task}
                    completed={checkTaskStatus(task, TaskStatus.task_complete)}
                  >
                    <StepLabel>{taskToContent.get(task)?.label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Button variant="contained" color="primary" className={classes.logoutButton} onClick={signout}>
               SIGN OUT
            </Button>
          </Paper>
        </Panel>
        <Panel xs={1} />
        <Panel xs={8}>
          <TaskManager key={session.currentTask} />
        </Panel>
        <Panel xs={1} />
      </Grid>
    );
  };

  return (
    <>
      {(activeStep < taskToContent.size && !isLoggedIn) && (
        <Prompt message="Leaving the page will reset your task session progress. Are you sure you want to leave?" />
      )}
      {activeStep == taskToContent.size ? <Feedback /> : renderTasks()}
    </>
  );
};

export default SessionPage;
