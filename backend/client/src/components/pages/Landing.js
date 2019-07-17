import React from "react";
import logo from "../layout/MYtineraryLogo.png";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import LogInModal from "../Auth/LogInModal";
import RegisterationModal from "../Auth/RegisterationModal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "auto"
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
            <Paper className={classes.paper}>
              Find your perfect trip, designed by insiders who know and love
              their cities{" "}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              direction="column"
            >
              <Grid item xs={12}>
                <Paper className={classes.paper}>Start browsing</Paper>
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
              <p>Want to build your own MYtinerary?</p>
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid
              item
              xs={6}
              style={{ display: "flex", alignContent: "baseline" }}
            >
              <LogInModal />
            </Grid>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <RegisterationModal />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default Landing;
