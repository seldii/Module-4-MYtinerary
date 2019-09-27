import React from "react";
import { Avatar, Grid, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10,
    width: 70,
    height: 70
  },
  container: {
    backgroundColor: "#f2f2f2"
  }
}));

const ProfileCard = ({ user }) => {
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid
        container
        xs={12}
        className={classes.container}
        justify="center"
        alignItems="center"
      >
        <Avatar
          alt={user.name}
          src={user.image || "/" + user.profileImage}
          className={classes.avatar}
        ></Avatar>
      </Grid>

      <Grid textAlign="center">
        {" "}
        <Typography variant="h6" fontFamily="Roboto">
          {user.name}
        </Typography>{" "}
      </Grid>
    </Grid>
  );
};

export default ProfileCard;
