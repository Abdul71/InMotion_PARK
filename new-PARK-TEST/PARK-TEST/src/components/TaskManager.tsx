import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player/youtube";
import { Button, Box, Typography, makeStyles, Grid, Checkbox, FormControlLabel, Divider, } from "@material-ui/core";
import { DoneOutline } from "@material-ui/icons";
import { Task, TaskStatus } from "../services/types";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { alertState, currentTaskState, sessionState, authState } from "../services/state";
import { TaskRecorder, EyeGazeTracker } from ".";
import { taskToContent } from "../services/tasks";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { Link as RouterLink } from "react-router-dom";





const useStyle = makeStyles(() => ({
  title: {
    fontWeight: 400,

  },
  player: {
    borderRadius: "2rem",
    overflow: "hidden",
    width: "100%",
    height: `${(8 / 12) * (9 / 16) * 100}vw`,
  },
  progress: {
    top: "auto",
    bottom: 0,
  },
  oneline: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    justifyItems: "center",
    display: "inline"
  },
  bolded_text: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  btn: {
    padding: '20px 30px 20px 30px',
    fontweight: '700',
    fontWeight: 'bold',
  },
}));

const TaskManager: React.FC = () => {
  const classes = useStyle();
  const session = useRecoilValue(sessionState);
  const setAlert = useSetRecoilState(alertState);
  const [currentTaskStatus, setCurrentTaskStatus] =
    useRecoilState(currentTaskState);
  const taskContent = taskToContent.get(session.currentTask);
  const checkboxRef = useRef(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const auth = firebase.auth();
  const history = useHistory();
  const setAuth = useSetRecoilState(authState);
  const signout = () => {
    auth.signOut().then(() => {
      setAuth(null);
      history.push("/");
    });
  };

  if (!taskContent)
    throw new Error(`No task content found for task ${session.currentTask}.`);

  const finishTutorial = () => {
    setCurrentTaskStatus(TaskStatus.task_in_progress);
  };
  const completeTask = () => {
    setCurrentTaskStatus(TaskStatus.task_complete);
  };
  const getInstructions = () => {
    setCurrentTaskStatus(TaskStatus.at_instructions);
  };
  const startTutorial = () => {

    //console.log(checkboxRef.current);
    // @ts-ignore: Object is possibly 'null'.
    if (!checkboxRef.current.checked) {
      alert("Please read the consent form in its entirety.");
    } else {
      setCurrentTaskStatus(TaskStatus.at_tutorial);
    }

  };

  const rewatch_tutorial = () => {
    setCurrentTaskStatus(TaskStatus.at_tutorial);
  };




  const renderTutorial = () => {
    return (

      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography align='center' variant="h5">
          <Box > Please watch the instructional video below and press START RECORDING when you are finished.</Box>
        </Typography>
        <Box m={1} />
        <Divider />
        <Box m={1} />

        <Box className={classes.player}>
          <ReactPlayer width="100%" height="100%" url={taskContent.url} controls />
        </Box>
        <Box m={1} />
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Button className={classes.btn} size="large" variant="contained" color="primary" onClick={finishTutorial}>
            START RECORDING
          </Button>
          {/* <Button variant="contained" color="primary" onClick={getInstructions}>
            READ INSTRUCTIONS
          </Button> */}
        </Grid>
      </Box>
    );
  };

  const renderInstructions = () => {


    return (
      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        justifyContent="center"
      >

        <Typography className={classes.title} color="primary" variant="h3">
          PARK TEST
        </Typography>
        <Box m={1} />
        <Typography variant="body1">
          You will complete 21 tasks, which should only take about 15-20 minutes total. You will need to enable access
          to your computer’s camera and microphone; if prompted to do so after pressing START
          below, please select “Allow”.

        </Typography>        <Box m={1} />


        <Typography variant="body2">
          A few pointers:
          <ul>
            <li className={classes.bolded_text} > Make sure you're using Google Chrome!  </li>
            <li>  Try to minimize background motion and noise when completing the tasks.</li>
            <li> Make sure your computer is on a solid surface and that you are seated in front of it.</li>
            <li> Make sure that when you start recording, you can see yourself in the screen from your head all the way down to your lower chest.</li>
            <li> Make sure that where you're recording has adequate lighting.</li>
          </ul>
        </Typography>
        <Box m={1} />

        {/* <Typography variant="body1">
          During the study, you will either read instructions or watch a video with instructions on how to perform a task. After,
          you will be asked to perform the task yourself. Click on Start Recording once you are ready and Stop Recording once you have
          finished performing the task. You may press the Retry button to reset the recording. You may return to the tutorial or instruction pages by clicking on specified buttons.
        </Typography>
        <Box m={1} /> */}



        {/* <Typography variant="body1">
          Remain seated still and try to minimize background motion and noise.
        </Typography>
        <Box m={1} />

        <Typography variant="body1">
          Please make sure your computer is on a steady surface, and you are seated in front of it. You should be at least two feet away
          from the monitor. Please do not place it on your lap.
        </Typography>
        <Box m={1} />

        <Typography variant="body1">
          Once you start recording and you see yourself on the screen, make sure that you can see yourself from head to below your chest.
        </Typography>
        <Box m={1} />

        <Box m={1} />

        <Typography variant="subtitle1">
          By clicking the "Start Study" button, you agree that you consent to participate in this study after reading the “Consent Form” below.
        </Typography>
        <Box m={1} /> */}


        <Typography variant="subtitle1">
          Read the <RouterLink to="/consent_form.pdf" target="_blank" download> consent form</RouterLink> and check the box below before clicking "Start".

        </Typography>

        <Box m={1} />

        {/* <label htmlFor="cons" className={classes.oneline} > I have read the consent form in its entirety and agree to its content.
          <input
            name="consent"
            type="checkbox"
            required
            id="cons"
            className={classes.oneline}
            ref={checkboxRef}
          /></label> */}

        <FormControlLabel
          control={<Checkbox />}
          label=" I have read the consent form in its entirety and agree to its content."
          inputRef={checkboxRef}

        />

        <Box m={1} />




        <Box display="flex" justifyContent="left">
          <Button variant="contained" color="primary" onClick={startTutorial} size="large">
            {session.currentTask == Task.quick_brown_fox ? "START" : "CONTINUE"}
          </Button>

        </Box>


      </Box>



    );
  };

  const renderRecorder = () => {
    switch (session.currentTask) {
      case Task.eye_gaze:
        return (
          <EyeGazeTracker
            size={80}
            duration={5}
            title={taskContent.title}
            instruction={taskContent.instruction}
          />
        );
      default:
        return (
          <TaskRecorder
            title={taskContent.title}
            instruction={taskContent.instruction}
            tutorial={rewatch_tutorial}
          />

        );
    }
  };

  const renderComplete = () => {
    return (
      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <DoneOutline fontSize="large" />
        <Typography variant="h4">{session.currentTask == Task.tongue_twister ? "Thank you for participating!" : "Good job!"}</Typography>
        <Typography>{session.currentTask == Task.tongue_twister ? "Please press FINISH." : "Press NEXT to continue"}</Typography>
        <Box m={1} />
        <Button variant="contained" color="primary" onClick={session.currentTask == Task.tongue_twister ? signout : completeTask}>
          {session.currentTask == Task.tongue_twister ? "FINISH" : "NEXT"}
        </Button>
      </Box>
    );
  };

  const [renderContent, setRenderContent] = useState(session.currentTask == Task.quick_brown_fox ? renderInstructions : renderTutorial);

  // display approperiate content on current task's status
  useEffect(() => {
    switch (currentTaskStatus) {
      case TaskStatus.upload_in_progress:
        setAlert({ content: "UPLOADING TASK FILES", type: "info" });
        break;
      case TaskStatus.upload_complete:
        setRenderContent(renderComplete);
        break;
      case TaskStatus.task_in_progress:
        setRenderContent(renderRecorder);
        break;
      case TaskStatus.at_tutorial:
        setRenderContent(renderTutorial);
        break;
      case TaskStatus.at_instructions:
        setRenderContent(renderInstructions);
        break;
    }
  }, [currentTaskStatus]);

  return (
    <Box p={2} width="100%" height="100%" display="flex" flexDirection="column">
      {renderContent}
    </Box>
  );
};

export default TaskManager;
