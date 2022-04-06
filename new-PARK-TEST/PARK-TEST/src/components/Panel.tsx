import React from "react";
import { Grid, makeStyles, GridProps } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  panel: {
    height: "90vh",
  },
}));

const Panel: React.FC<GridProps> = (props) => {
  const classes = useStyle();
  return (
    <Grid
      item
      container
      className={`${classes.panel} ${props.className}`}
      justify={props.justify ?? "center"}
      alignItems={props.alignItems ?? "center"}
      {...props}
    >
      {props.children}
    </Grid>
  );
};

export default Panel;
