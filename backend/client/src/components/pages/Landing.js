import React from "react";
import logo from "../layout/logooo.png";
import start from "../layout/start.png";
import { Grid, Button, Typography, Fab } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
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
    backgroundColor: "white",
    margin: "auto",
    fontStyle: "italic",
    color: theme.palette.secondary.main
  },
  button: {
    marginBottom: theme.spacing(2),
    background: theme.palette.secondary.light,
    "&:hover": {
      background: theme.palette.primary.light
    },
    color: "white",
    font: theme.typography.button,
    width: "100%",
    height: "2.5rem"
  },
  search: {
    color: theme.palette.primary.main
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
          {/* <Grid item xs={12}>
            <div className={classes.paper}>
              Find your perfect trip, designed by insiders who know and love
              their cities{" "}
            </div>
          </Grid> */}
          <Grid item xs={12}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              direction="column"
              style={{ background: { start } }}
            >
              <Grid item xs={12}>
                <Typography className={classes.paper} variant="body2">
                  Start browsing
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Link to="/cities">
                  <FaSearch size={56} className={classes.search} />
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography variant="body2" className={classes.paper}>
                Want to build your own MYtinerary?
              </Typography>
            </Grid>
          </Grid>
          <Grid container direction="column" justify="center">
            <Grid item xs={12}>
              <Fab
                fullWidth
                variant="extended"
                component="button"
                className={classes.button}
              >
                <LogInModal />
              </Fab>
            </Grid>
            <Grid item xs={12}>
              <Fab variant="extended" className={classes.button}>
                <RegisterationModal />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default Landing;
