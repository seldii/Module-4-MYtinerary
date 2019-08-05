import React from "react";
import ActivitySlides from "./ActivitySlides";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Comment from "./Comment";

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: "40px",
    width: "100%"
  },
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "2px 4px"
  },
  icon: {
    alignSelf: "center"
  },
  input: {
    flex: "auto"
  },
  title: {
    color: theme.palette.primary.main
  }
}));
const Activity = props => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h5 className={classes.title}>Activities:</h5>
      <ActivitySlides itinerary={props.itinerary} />
      <Divider />
      <Comment itinerary={props.itinerary} />
    </div>
  );
};

export default Activity;
