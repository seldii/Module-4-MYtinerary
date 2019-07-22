import React from "react";
import ActivitySlider from "./ActivitySlider";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Comment from "./Comment";
import CommentsList from "./CommentsList";

const useStyles = makeStyles({
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
  }
});
const Activity = props => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h5>Activities:</h5>
      <ActivitySlider itinerary={props.itinerary} />
      <Divider />
      <Comment itinerary={props.itinerary} />
    </div>
  );
};

export default Activity;
