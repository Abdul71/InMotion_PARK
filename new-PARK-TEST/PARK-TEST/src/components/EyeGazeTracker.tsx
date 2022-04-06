import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import { useRecorder } from "../services/recorder";
import Panel from "./Panel";
import { DoneOutline, Replay } from "@material-ui/icons";

interface GazeTrackerProps {
  size: number;
  duration: number;
  title: string;
  instruction: string;
}

const useStyle = makeStyles(() => ({
  canvas: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  large: {
    fontSize: "3rem",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const EyeGazeTracker: React.FC<GazeTrackerProps> = (props) => {
  const { size, duration, title, instruction } = props;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [count, setCount] = useState(-1);
  const [isTutorial, setIsTutorial] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const { palette } = useTheme();
  const padding = size / 2;
  const total = 2 * (height + width);

  const recorder = useRecorder();
  const classes = useStyle();
  const controls = useAnimation();

  const tick = () => setCount(count - 1);

  // start recording and set timer
  const start = async () => {
    await recorder.start();
    setCount(duration);
    setIsTutorial(false);
  };

  const retry = async () => {
    setIsComplete(false);
    await recorder.retry();
    await start();
  };

  const handleComplete = async () => {
    const file = await recorder.stop();
    setFile(file);
    setIsComplete(true);
  };

  const end = async () => {
    if (!file)
      throw new Error("File is null. Did you forget to stop the recorder?");
    await recorder.end(file);
  };

  const startSquare = () => {
    const top = [
      padding,
      padding,
      height - padding - size,
      height - padding - size,
      padding,
    ];
    const left = [
      padding,
      width - padding - size,
      width - padding - size,
      padding,
      padding,
    ];
    const transition = {
      duration: 10,
      // set frames proportional to width/height for constant speed
      times: [
        0,
        width / total,
        (width + height) / total,
        (2 * width + height) / total,
        1,
      ],
      ease: "linear",
    };
    controls.start({
      top,
      left,
      transition,
    });
  };

  // measure component dimension
  useEffect(() => {
    setWidth(ref.current?.clientWidth || 0);
    setHeight(ref.current?.clientHeight || 0);
  });

  useEffect(() => {
    // start antimation
    if (count == 0) {
      startSquare();
      return;
    }

    // countdown
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [count]);

  const renderSquare = () => {
    return (
      <motion.div
        style={{
          position: "absolute",
          width: size,
          height: size,
          top: padding,
          left: padding,
          background: palette.primary.main,
          borderRadius: size / 4,
        }}
        animate={controls}
        onAnimationComplete={handleComplete}
      />
    );
  };

  const renderInstruction = () => {
    return (
      <>
        <Typography variant="h4">
          <Box fontWeight={700}>{title}</Box>
        </Typography>
        <Box m={1} />
        <Typography variant="h6">{instruction}</Typography>
        <Box m={1} />
        <Button variant="contained" onClick={start}>
          Start Recording
        </Button>
      </>
    );
  };

  const renderComplete = () => {
    return (
      <Box display="flex" width="100%" justifyContent="space-around">
        <Box display="flex" alignItems="center" flexDirection="column">
          <Replay className={classes.large} />
          <Box m={1} />
          <Button variant="contained" onClick={retry}>
            Retry
          </Button>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <DoneOutline className={classes.large} />
          <Box m={1} />
          <Button variant="contained" onClick={end}>
            Finish
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <div ref={ref} className={classes.canvas}>
      {renderSquare()}
      <Grid container>
        <Panel xs={3} />
        <Panel className={classes.center} xs={6}>
          {isTutorial && renderInstruction()}
          {isComplete && renderComplete()}
          {count > 0 && <Typography variant="h1">{count}</Typography>}
        </Panel>
        <Panel xs={3} />
      </Grid>
    </div>
  );
};

export default EyeGazeTracker;
