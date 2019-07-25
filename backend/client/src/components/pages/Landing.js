import React from "react";
import logo from "../layout/MYtineraryLogo.png";
import { Grid, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import LogInModal from "../Auth/LogInModal";
import RegisterationModal from "../Auth/RegisterationModal";
import { makeStyles } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "white",
    fontFamily: "Lucida Console",
    margin: "auto"
  },
  button: {
    marginBottom: theme.spacing(2),
    background: "transperant"
  }
}));

function Landing() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <img style={{ maxWidth: "100%" }} src={logo} alt="logo" />
          <Grid item xs={12}>
            <div className={classes.paper}>
              Find your perfect trip, designed by insiders who know and love
              their cities{" "}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              direction="column"
            >
              <Grid item xs={12}>
                <div className={classes.paper}>Start browsing</div>
              </Grid>
              <Grid item xs={12}>
                <Link to="/cities">
                  <FaArrowAltCircleRight size={56} color={"#FF6347"} />
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <div className={classes.paper}>
                Want to build your own MYtinerary?
              </div>
            </Grid>
          </Grid>
          <Grid container direction="column" justify="center">
            <Grid item xs={12}>
              <Button fullWidth variant="outlined" className={classes.button}>
                <LogInModal style={{ fontFamily: "Lucida Console" }} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="outlined" className={classes.button}>
                <RegisterationModal />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default Landing;
