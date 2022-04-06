import React, { useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  useTheme,
  Button
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {useSetRecoilState } from "recoil";
import { authState } from "../services/state";
import firebase from "firebase/app";
import "firebase/auth";

const useStyle = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
  },
  loaderTitle: {
    fontSize: "1rem",
  },
  largeIcon: {
    fontSize: "8em",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    padding: theme.spacing(2),
    justifyContent: "center",
  },
  distribution: {
    height: "15vh",
  },
  card: {
    width: "100%",
  },
  flex: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  media: {
    height: "100%",
    width: "100%",
  },
}));

const Feedback: React.FC = () => {
  const classes = useStyle();
  const theme = useTheme();
  const auth = firebase.auth();
  const history = useHistory();
  const setAuth = useSetRecoilState(authState);
  const signout = () => {
    auth.signOut().then(() => {
      setAuth(null);
      history.push("/");
    });
  };

  return (
    <Grid container>
      <Grid item xs={1} />
        <Grid item xs={1}>
          <h1>THANK YOU FOR FINISHING THE STUDY</h1>
          </Grid> 
          
          
      <Grid item xs={1} />
      <Grid item xs={1}>
          <h3>Please click the sign out button.</h3>
          </Grid> 
          <Button variant="contained" color="primary" onClick={signout}>
               SIGN OUT
            </Button>
    </Grid>
  );
};

export default Feedback;
