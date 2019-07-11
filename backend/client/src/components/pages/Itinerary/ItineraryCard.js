import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import itineraryReducer from "../../../store/reducers/itineraryReducer";
import { userInfo } from "os";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    flex: "2 0 auto"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex: "2 0 auto"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  info: {
    flex: "1 0 auto"
  },
  playIcon: {
    height: 38,
    width: 38
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  profile: {
    display: "flex",
    flexDirection: "column"
  }
}));

const ItineraryCard = ({ itinerary }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.card}>
          <div className={classes.profile}>
            <Avatar
              alt={itinerary.user}
              src={itinerary.profilePic}
              className={classes.avatar}
            />
            <div style={{ margin: "auto" }}>
              <Typography>{itinerary.user}</Typography>
            </div>
          </div>

          <CardContent className={classes.content}>
            <Typography component="h1" variant="subtitle1">
              {itinerary.title}
            </Typography>
            <Grid
              className={classes.info}
              container
              direction="row"
              justify="space-between"
              alignItems="baseline"
            >
              <Typography variant="body2" component="div">
                Likes:{itinerary.rating || "-"}
              </Typography>
              <Typography variant="body2" component="div">
                {itinerary.duration || "-"} Hours
              </Typography>
              <Typography variant="body2" component="div">
                {(() => {
                  const x = itinerary.price;
                  switch (true) {
                    case x === 0:
                      return "Free";
                    case x < 15:
                      return "$";
                    case x < 40:
                      return "$$";
                    case x < 60:
                      return "$$$";
                    default:
                      return "";
                  }
                })()}
              </Typography>
            </Grid>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ItineraryCard;
