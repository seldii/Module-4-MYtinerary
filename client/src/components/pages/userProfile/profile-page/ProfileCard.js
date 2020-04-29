import React from "react";
import { Avatar, Grid, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: 10,
    width: 70,
    height: 70,
  },
  container: {
    backgroundColor: "#f2f2f2",
  },
  nameTag: {
    textAlign: "center",
  },
}));

const ProfileCard = ({ user, itineraries }) => {
  const classes = useStyles();
  const { name, image, profileImage } = user;

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid
        item
        container
        xs={12}
        className={classes.container}
        justify="center"
        alignItems="center"
      >
        <Avatar
          alt={name}
          src={image || "/" + profileImage}
          className={classes.avatar}
        />
        <div>
          <span>{itineraries ? itineraries.length : ""}</span>
          <span>Itineraries</span>
        </div>
      </Grid>

      <Grid className={classes.nameTag}>
        {" "}
        <Typography variant="h6" fontFamily="Roboto">
          {user.name}
        </Typography>{" "}
      </Grid>
    </Grid>
  );
};

export default ProfileCard;
