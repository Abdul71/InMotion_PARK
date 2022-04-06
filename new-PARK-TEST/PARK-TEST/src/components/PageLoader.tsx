import React from "react";
import { Box, CircularProgress, Grid } from "@material-ui/core";
import Panel from "./Panel";

const PageLoader: React.FC = (props) => {
  return (
    <Grid container>
      <Panel xs={4} />
      <Panel xs={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          {props.children || <CircularProgress size="3rem" />}
        </Box>
      </Panel>
      <Panel xs={4} />
    </Grid>
  );
};

export default PageLoader;
