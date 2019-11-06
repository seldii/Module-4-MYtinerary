import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import ItineraryCard from "../../Itinerary/ItineraryCard";
import { Typography, Divider, Grid } from "@material-ui/core/";

const styles = theme => ({
  notfound: {
    color: theme.palette.secondary.main,
    textAlign: "center"
  },
  link: {
    color: theme.palette.secondary.main,
    textAlign: "center",
    textDecoration: "underline"
  },
  root: {
    paddingTop: "10px",
    position: "fixed",
    top: "50%",
    left: "50%",
    /* bring your own prefixes */
    transform: `translate(${-50}%, ${-50}%)`,
    [theme.breakpoints.up("sm")]: {
      width: "40% !important"
    },
    [theme.breakpoints.down("xs")]: {
      width: "80% !important"
    }
  }
});

const NotFoundPage = props => {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Typography className={classes.notfound}>
            You've not created any itinerary yet
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <img
            style={{ maxWidth: "100%" }}
            src="/images/notfound.png"
            alt="not found"
          />
        </Grid>
        <Grid item xs={12}>
          <Link to="/itinerary-creator">
            <Typography className={classes.link}>
              Are you ready to create your own itinerary?
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

NotFoundPage.propTypes = {};

export default NotFoundPage;
