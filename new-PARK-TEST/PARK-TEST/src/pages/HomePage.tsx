
import React, { useEffect, useState } from "react";
import { Box, Fab, Grid, Typography, makeStyles, Button } from "@material-ui/core";
import { Panel } from "../components/index";
import landing from "./../assets/landing.jpg";
import { PlayArrow } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import rochci from "./../assets/HCI_Logo.png";
import chet from "./../assets/CHeT_Logo.png";
import udall from "./../assets/UDALL_Logo.png";
import uofr from "./../assets/UofR_Logo.png";
import Faq from "react-faq-component";


const useStyle = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
  },
  media: {
    backgroundImage: `url(${landing})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  footer_grid: {
    alignItems: "stretch",
    backgroundColor: theme.palette.primary.main,
  },
  footer_logo: {
    justifyContent: "center"
  },
  logos: {
    height: "25vh",
    alignItems: "center",
    justifyContent: "space-around",

  },

  logo: {
    height: '100',
    width: '200px',
  },

  logo_chet: {
    height: '50px',
    width: '300px',
  },
  quarter_panel: {
    height: "25vh",
    alignItems: "center",
    justifyContent: "center"

  },

  double_panel: {
    height: "70vh",
    alignItems: "center",
    justifyContent: "center"

  },

  disclaimer: {
    padding: '10px 20px 15px 25px',


  },

  footer: {
    height: "25vh",
    alignItems: "center",
    padding: '10px 20px 15px 25px',
    backgroundColor: '#ECEDF7',
    borderRadius: '12px',
    boxShadow: '0 1px 8px rgba(0, 0, 0, 0.25)',


  },

}));




const HomePage: React.FC = () => {
  const classes = useStyle();

  const data = {
    title: "FAQs",
    rows: [
      {
        title: "Whom do I contact if I have a question not answered on the website?",
        content: `Please send an email to urparkstudy@gmail.com.`,
      },
      {
        title: "Where is the consent form?",
        content: <p>You can find it by clicking <a target="_blank" href="">HERE</a>!</p>,
      },
      {
        title: "Who will have access to my data?",
        content:
          `Only the researchers involved in this study will have access to your data which is stored in secured servers, although the general analysis will be later made public so that everyone knows our progress with the research in general.`,
      },
      {
        title: "I don't have Parkinson's disease. Can I still participate in PARK?",
        content:
          `Unfortunately, No. We are currently only collecting data of Parkinson's patients.`,
      },
    ],
  };

  const styles = {
    bgColor: '#FAFAFA',
    titleTextColor: "#1B3C6F",
    titleTextSize: '30px',
    rowTitleColor: '#1B3C6F',
    rowTitleTextSize: 'medium',
    rowContentColor: '#3c3c3c',
    rowContentTextSize: '16px',
    rowContentPaddingTop: '10px',
    rowContentPaddingBottom: '10px',
    rowContentPaddingLeft: '50px',
    rowContentPaddingRight: '150px',
    arrowColor: "#1B3C6F",
    //transitionDuration: "1s",
    // timingFunc: "ease"


  };

  const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
  };

  return (
    <Grid container>
      <Panel xs={1} />
      <Panel xs={5}>
        <Box m={1}>
          <Typography className={classes.title} color="primary" variant="h2">
            PARK
          </Typography>
          <Box m={1} />
          <Typography variant="h5">
            PARK is a web application that evaluates features of Parkinson’s disease from motor, speech, and facial mimicry tasks
          </Typography>
          <Box m={3} />
          <Fab
            size="large"
            variant="extended"
            color="primary"
            component={RouterLink}
            to="/session"
          >
            <PlayArrow />
            <Box m={1}>Get Started</Box>
          </Fab>
        </Box>
      </Panel>
      <Panel className={classes.media} xs={6} />

      <Grid
        item
        container
        className={classes.logos}
      >
        <Grid item >
          <img src={uofr} alt="UofR Logo" className={classes.logo} />
        </Grid>
        <Grid item >
          <img src={rochci} alt="ROCHCI Logo" className={classes.logo} />
        </Grid>
        <Grid item >
          <img src={chet} alt="CHET Logo" className={classes.logo_chet} />
        </Grid>
        <Grid item >
          <img src={udall} alt="URMC Logo" className={classes.logo} />
        </Grid>
      </Grid >

      {/* <Box m={4} /> */}

      {/* 
      <Grid
        item
        container
        className={classes.double_panel}
      >
        <Grid
          item
          xs={10}
          className={classes.disclaimer}
        >
          <Box m={2} />

          <div>
            <Faq
              data={data}
              styles={styles}
              config={config}
            />
          </div>

        </Grid>


      </Grid > */}

      <Box m={3} />

      {/* <Grid
        item
        container
        className={classes.footer}
      >

        <Grid
          xs={6}
          container
          direction="column"
          alignItems="center"

        >
          <Typography variant="h6">
            Contact Us
          </Typography>
          <Typography variant="body1">
            urparkstudy@gmail.com
          </Typography>
        </Grid>

        <Grid
          xs={6}
          container
          direction="column"
          alignItems="center"
        >
          <Typography variant="h6">
            Center for Health + Technology
          </Typography>
          <Typography variant="body1">
            Saunders Research Building
          </Typography>
          <Typography variant="body1">
            265 Crittenden Blvd
          </Typography>
          <Typography variant="body1">
            Rochester, NY 14642
          </Typography>

        </Grid>
      </Grid > */}




    </Grid>
  );
};

export default HomePage;

