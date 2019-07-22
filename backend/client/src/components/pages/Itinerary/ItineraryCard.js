import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  CardActions,
  Divider
} from "@material-ui/core/";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Activity from "./Activity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateItinerary } from "../../../store/actions/itineraryAction";
import { getCurrentDate } from "../../utility/GetCurrentDate";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    width: "100%",
    marginBottom: theme.spacing(1)
  },
  details: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    flex: "2 0 auto"
  },
  content: {
    width: "100%"
  },

  avatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  profile: {
    display: "flex",
    flexDirection: "column"
  },

  expanded: {}
}));

const ItineraryCard = ({ itinerary, updateItinerary, auth }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function toggle() {
    setLiked(!liked);
    console.log(itinerary._id);
    console.log(auth.user);
    const id = itinerary._id;
    const prevItinerary = itinerary;
    const prevLikes = itinerary.likes;
    const newDate = getCurrentDate();
    const newLike = {
      user: auth.user,
      date: newDate
    };

    console.log(newLike);

    const likes = [...prevLikes, newLike];
    const newItinerary = {
      ...prevItinerary,
      likes
    };

    console.log(newItinerary);
    updateItinerary(id, newItinerary);
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            alt={itinerary.user.name}
            src={itinerary.user.image}
            className={classes.avatar}
          />
        }
        action={
          <IconButton
            aria-label="Settings"
            onClick={toggle}
            className={clsx(classes.like, {
              [classes.likedColored]: liked
            })}
            aria-expanded={liked}
          >
            <FontAwesomeIcon
              style={{ color: liked ? "red" : "grey" }}
              icon="heart"
            />
          </IconButton>
        }
        title={itinerary.title}
        subheader={itinerary.user.name}
      />

      <CardContent className={classes.content}>
        <Grid
          className={classes.info}
          container
          direction="column"
          justify="space-between"
          alignItems="baseline"
        >
          <Grid
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
          <Box display="flex" flexDirection="row" flexWrap="wrap">
            {itinerary.hashtag.length > 0 ? (
              itinerary.hashtag[0].split("," || " ").map((h, index) => (
                <Typography key={index} variant="body2">
                  #{h}
                </Typography>
              ))
            ) : (
              <div>#</div>
            )}
          </Box>
        </Grid>
      </CardContent>

      <CardActions disableSpacing style={{ justifyContent: "center" }}>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <Typography style={{ color: "blue" }}>
            {!expanded ? "Show More" : "Show Less"}
          </Typography>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Activity itinerary={itinerary} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

ItineraryCard.propTypes = {
  updateItinerary: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateItinerary }
)(ItineraryCard);
