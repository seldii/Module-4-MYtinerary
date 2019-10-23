import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItinerariesByUser } from "../../../store/actions/itineraryAction";
import { Link, withRouter } from "react-router-dom";
import ItineraryCard from "../../pages/Itinerary/ItineraryCard";
import { Typography, Divider, Grid } from "@material-ui/core/";
import Footer from "../../layout/Footer";
import { withStyles } from "@material-ui/core/styles";

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

export const MyItineraries = props => {
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector(state => state.auth.user._id);
  const itinerariesByUser = useSelector(
    state => state.itineraries.itinerariesByUser
  );
  const dispatch = useDispatch();
  const classes = props.classes;

  useEffect(() => {
    const iti = async () => {
      await dispatch(getItinerariesByUser(userId));
    };
    setIsLoading(false);
    iti();
  }, [itinerariesByUser]);

  let itineraryList;
  if (isLoading) {
    itineraryList = <div>Loading..</div>;
  } else {
    if (itinerariesByUser.length) {
      itineraryList = itinerariesByUser.map(i => {
        return <ItineraryCard key={i._id} itinerary={i} />;
      });
    } else {
      itineraryList = (
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
    }
  }

  return (
    <React.Fragment>
      <Divider variant="middle" />
      {itineraryList}
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(
  withStyles(styles, { withTheme: true })(MyItineraries)
);
