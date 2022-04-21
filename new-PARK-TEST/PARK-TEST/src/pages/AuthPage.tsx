import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  Divider,
  InputLabel,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { TextField, Select, RadioGroup } from "formik-material-ui";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Panel } from "../components";
import { useSetRecoilState } from "recoil";
import { alertState } from "../services/state";

const FormDivider: React.FC = () => {
  return (
    <Box mt={2} mb={2}>
      <Divider />
    </Box>
  );
};

const Header: React.FC = () => {
  return (
    <>
      <Typography variant="h3" color="primary">
        PARK
      </Typography>
      <FormDivider />
    </>
  );
};

const RegisterForm: React.FC = () => {
  const history = useHistory();
  const auth = firebase.auth();
  const db = firebase.firestore();
  const setAlert = useSetRecoilState(alertState);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Required")
      .email("Please enter a valid email"),
    password: Yup.string()
      .required("Required"),
    confirmPassword: Yup.string()
      .required("Please re-enter your password")
      .oneOf([Yup.ref("password"), ""], "Passwords must match"),
    age: Yup.number()
      .required("Required")
      .positive("Please input a positive number")
      .integer(),
    pd: Yup.string().required("Required").oneOf(["yes", "no"]),
    gender: Yup.string().required("Required").oneOf(["male", "female", "non-binary"]),
    inmotion: Yup.string().required("Required").oneOf(["yes", "no"]),
    color: Yup.string().required("Required").oneOf(["Yellow", "Green", "Orange", "Blue", "NA"]),
  });

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    pd: "",
    gender: "",
    inmotion: "",
    color: "",

  };

  const handleSubmit = async (values) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      const { password, confirmPassword, ...data } = values;
      await db.doc(`users/${user?.uid}`).set(data);
      history.push("/login");
    } catch (error) {
      let errorMessage = "Unexpected Error, refresh the page and try again";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setAlert({ content: errorMessage, type: "error" });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors }) => (
        <Form>
          <Header />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                fullWidth
                name="email"
                type="email"
                label="Email"
                component={TextField}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                fullWidth
                name="password"
                type="password"
                label="Password"
                component={TextField}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                fullWidth
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                component={TextField}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                fullWidth
                name="age"
                type="number"
                label="Age"
                component={TextField}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.gender} >
                <FormLabel>Gender</FormLabel>
                <Field name="gender" row component={RadioGroup}>
                  <FormControlLabel
                    value="male"
                    label="Male"
                    //style={{'&$checked': { color: 'green' }}}
                    control={<Radio color="primary" />}
                  //control={<Radio  />}
                  />
                  <FormControlLabel
                    value="female"
                    label="Female"
                    control={<Radio color="primary" />}
                  />
                  <FormControlLabel
                    value="non-binary"
                    label="Non-Binary"
                    control={<Radio color="primary" />}
                  />
                </Field>
                <FormHelperText>{errors.gender}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.pd}>
                <FormLabel>
                  Have you been diagnosed with Parkinson's disease?
                </FormLabel>
                <Field name="pd" row component={RadioGroup}>
                  <FormControlLabel
                    value="yes"
                    label="Yes"
                    control={<Radio color="primary" />}
                  />
                  <FormControlLabel
                    value="no"
                    label="No"
                    control={<Radio color="primary" />} />
                </Field>
                <FormHelperText>{errors.pd}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.inmotion}>
                <FormLabel>
                  Are you affiliated with InMotion?
                </FormLabel>
                <Field name="inmotion" row component={RadioGroup}>
                  <FormControlLabel
                    value="yes"
                    label="Yes"
                    control={<Radio color="primary" />}
                  />
                  <FormControlLabel
                    value="no"
                    label="No"
                    control={<Radio color="primary" />} />
                </Field>
                <FormHelperText>{errors.inmotion}</FormHelperText>
              </FormControl>
            </Grid>


            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.color}>
                <InputLabel htmlFor="color-select">If you are affiliated with inmotion please select your color, Otherwise please select NA</InputLabel>
                <Field id="color-select" name="color" multiple={false} component={Select}>
                  <MenuItem value="Yellow">Yellow</MenuItem>
                  <MenuItem value="Green">Green</MenuItem>
                  <MenuItem value="Orange">Orange</MenuItem>
                  <MenuItem value="Blue">Blue</MenuItem>
                  <MenuItem value="NA">NA</MenuItem>

                </Field>
                <FormHelperText>{errors.color}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} direction="row" alignItems="stretch">
              <FormDivider />
              <Box display="flex" justifyContent="center" >
                <Button
                  style={{ width: '30%', height: '50%', padding: 20 }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};


const LoginForm: React.FC = () => {
  const history = useHistory();
  const setAlert = useSetRecoilState(alertState);
  const auth = firebase.auth();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email()
      .required("Please enter your email")
      .trim()
      .lowercase(),
    password: Yup.string().required("Please enter your password"),
  });

  const handleSubmit = async (values) => {
    try {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      history.push("/session");
    } catch (error) {
      let errorMessage = "Unexpected Error, refresh the page and try again";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setAlert({ content: errorMessage, type: "error" });
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Header />
          <Field
            name="email"
            label="Email"
            color="secondary"
            fullWidth
            component={TextField}
          />
          <Field
            name="password"
            type="password"
            color="secondary"
            label="Password"
            fullWidth
            component={TextField}
          />
          <Box
            pt={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Button
              style={{ width: '100%', height: '50%', padding: 17 }}
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              <Typography variant='h6'> Login </Typography>

            </Button>
            <FormDivider />
            <Box m={0.5} />
            <Typography variant="body1" align="center">
              New to PARK?
            </Typography>
            <Button variant="outlined" component={RouterLink} to="/register" style={{ width: '100%', height: '50%', padding: 17 }} >
              <Typography variant="h6"> Register </Typography>
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

const ResetPasswordForm: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const setAlert = useSetRecoilState(alertState);
  const auth = firebase.auth();

  const validationSchema = Yup.object({
    email: Yup.string().required("Required").email().trim().lowercase(),
  });

  const handleSubmit = async (values) => {
    try {
      await auth.sendPasswordResetEmail(values.email);
      setSuccess(true);
    } catch (error) {
      setAlert({ content: error.message, type: "error" });
    }
  };

  if (success) {
    return (
      <Box>
        <Typography variant="h6">Success!</Typography>
        <Typography variant="caption">
          A confirmation code has been sent to your email, please enter the code
          to reset your password
        </Typography>
        <Button variant="contained" component={RouterLink} to="/login">
          Login
        </Button>
      </Box>
    );
  }

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Header />
          <Typography>
            Enter the email address associated with your account, and we'll send
            you a link to reset your password
          </Typography>
          <Field
            name="email"
            label="Password Reset Email"
            fullWidth
            component={TextField}
          />

          <Box mt={2} display="flex" justifyContent="center">
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Reset Password
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

const AuthContainer: React.FC = (props) => {
  return (
    <Grid container>
      <Panel xs={3} />
      <Panel xs={6}>{props.children}</Panel>
      <Panel xs={3} />
    </Grid>
  );
};

export const RegisterPage: React.FC = () => {
  return (
    <AuthContainer>
      <RegisterForm />
    </AuthContainer>
  );
};

export const LoginPage: React.FC = () => {
  return (
    <AuthContainer>
      <LoginForm />
    </AuthContainer>
  );
};

export const ResetPasswordPage: React.FC = () => {
  return (
    <AuthContainer>
      <ResetPasswordForm />
    </AuthContainer>
  );
};
