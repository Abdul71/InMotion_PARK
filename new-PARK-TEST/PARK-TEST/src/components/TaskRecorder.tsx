import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  makeStyles,
  Chip,
} from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";
import { useRecorder } from "../services/recorder";
import ReactPlayer from "react-player";
import { Grid } from "@material-ui/core";


const useStyle = makeStyles((theme) => ({
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
  },
  video: {
    flexGrow: 1,
    borderRadius: "2rem",
    color: "white",
    marginBottom: theme.spacing(2),
    backgroundColor: "black",
    webkitTransform: `scaleX(-1)`,
    transform: `scaleX(-1)`,
  },
  liveIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1rem",
    zIndex: 10,
  },

  timer: {
    position: "absolute",
    top: 0,
    left: 820,
    margin: "1rem",
    zIndex: 10,
    width: "7%",
    height: "10%",
    fontSize: '20px',

  },

  bolded_text: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  }
}));

interface TaskRecorderProps {
  title: string;
  instruction: string;
  tutorial: () => void;
}

const TaskRecorder: React.FC<TaskRecorderProps> = (props) => {
  const classes = useStyle();
  const recorder = useRecorder();

  const [count, setCount] = useState(-1);
  const tick = () => setCount(count - 1);

  const [timer, setTimer] = useState(-1);
  const tick_timer = () => setTimer(timer + 1);

  const renderPlaceholder = () => {
    return (
      <>
        <Box className={`${classes.video} ${classes.center}`}>
          <Typography variant="h4" align="center" color="inherit" style={{ transform: `scaleX(-1)` }}>
            PRESS START TO RECORD
          </Typography>
        </Box>

        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >

          <Button variant="contained" color="primary" onClick={props.tutorial}>
            REWATCH INTRUCTIONAL VIDEO
          </Button>
          <Button size="large" variant="contained" color="primary" onClick={start} >
            START
          </Button>


        </Grid>

      </>
    );
  };

  const renderPlaceholderCountDown = () => {
    return (
      <>
        <Box className={`${classes.video} ${classes.center}`}>
          <Typography variant="h1" align="center" color="inherit" style={{ transform: `scaleX(-1)` }}>
            {count >= 2 ? count - 1 : "GO"}
          </Typography>
        </Box>

      </>
    );
  };

  const start = async () => {
    setCount(4);
  };

  const retry = async () => {
    recorder.retry()
    setCount(-1);
  };

  const end = async () => {
    const file = await recorder.stop();
    await recorder.end(file);
  };

  useEffect(() => {

    if (count == 2) {
      recorder.start();
    }

    if (count == 0) {
      setTimer(0);
      return;
    }


    // countdown
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [count]);

  useEffect(() => {

    // countdown
    const id = setInterval(tick_timer, 1000);
    return () => clearInterval(id);
  }, [timer]);




  const renderStream = (stream: MediaStream) => {
    return (
      <>
        <Chip
          className={classes.liveIcon}
          icon={<FiberManualRecord />}
          label="REC"
          color="secondary"
        />

        <Chip
          className={classes.timer}


          label={timer}
          color="secondary"
        />

        <ReactPlayer
          className={`${classes.video} ${classes.center}`}
          url={stream}
          width="100%"
          playing
          muted
        />
        <Box display="flex" justifyContent="space-around">
          <Button size="large" variant="contained" onClick={retry}>
            RETRY
          </Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={end}
          >
            FINISH
          </Button>
        </Box>
      </>
    );
  };

  const renderInstruction = () => {
    return (
      <Box p={2}>
        <Typography variant="h4">
          <Box >{props.title}</Box>
        </Typography>
        <Box m={1} />
        <Divider />
        <Box m={1} />
        <Typography className={classes.bolded_text} variant="h6">{props.instruction}</Typography>
      </Box>
    );
  };

  return (
    <>
      {renderInstruction()}
      <Box className={classes.center} width="100%" height="100%">

        {recorder.stream ? renderStream(recorder.stream) : count >= 0 ? renderPlaceholderCountDown : renderPlaceholder()}

      </Box>
    </>
  );
};

export default TaskRecorder;
