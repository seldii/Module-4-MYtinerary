import React from "react";
import ActivitySlider from "../../layout/ActivitySlider";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
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
const Activity = () => {
  const classes = useStyles();
  return (
    <div style={{ width: "100%" }}>
      <h5>Activities:</h5>
      <ActivitySlider />
      <Typography>Comments:</Typography>
      <Paper className={classes.root}>
        <InputBase className={classes.input} placeholder="Your comment" />
        <FontAwesomeIcon className={classes.icon} icon="paper-plane" />
      </Paper>
    </div>
  );
};

export default Activity;
