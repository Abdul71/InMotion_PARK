import React, { useEffect, useState } from "react";
import { Box, CssBaseline, IconButton, Snackbar } from "@material-ui/core";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import {
  HomePage,
  SessionPage,
  RegisterPage,
  LoginPage,
  ResetPasswordPage,
} from "./pages/index";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { authState, alertState, sessionState } from "./services/state";
import { PageLoader } from "./components";
import { Close } from "@material-ui/icons";
import { Task } from "./services/types";

// firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

if (process.env.NODE_ENV === "production") {
  firebase.analytics();
} else {
  db.useEmulator("localhost", 8080);
  storage.useEmulator("localhost", 9199);
  auth.useEmulator("http://localhost:9099");
}

// protected routes
const PrivateRoute = ({ component: Component, load, ...rest }) => {
  const auth = useRecoilValue(authState);

  if (load) return <PageLoader />;

  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const App: React.FC = () => {
  const auth = firebase.auth();
  const setAuth = useSetRecoilState(authState);
  const [alert, setAlert] = useRecoilState(alertState);
  const [session, setSession] = useRecoilState(sessionState);
  const [load, setLoad] = useState(true);
  const location = useLocation();

  // set authState
  useEffect(() => {
    const handler = auth.onAuthStateChanged((user) => {
      setAuth(user && { userID: user.uid });
      setLoad(false);
    });
    return () => handler();
  }, []);

  // set sessionState on session page entry
  useEffect(() => {
    if (location.pathname == "/session")
      setSession({
        ...session,
        startDate: new Date(),
        currentTask: Task.quick_brown_fox,
        taskProgress: {},
      });
  }, [location]);

  const renderRouter = () => {

    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#1b3c70",
        },
        secondary: {
          main: "#8c8c8c",
        },
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PrivateRoute
            exact
            path="/session"
            load={load}
            component={SessionPage}
          />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/reset-password" component={ResetPasswordPage} />
        </Switch>
      </ThemeProvider>
    );
  };

  const handleClose = () => {
    setAlert({ type: "none", content: "" });
  };

  return (
    <Box>
      <CssBaseline />
      {renderRouter()}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={alert.type !== "none"}
        onClose={handleClose}
        message={alert.content}
        action={
          <IconButton onClick={handleClose}>
            <Close style={{ color: "white" }} />
          </IconButton>
        }
      />
    </Box>
  );
};

export default App;