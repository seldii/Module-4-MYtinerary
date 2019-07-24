import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  CardActions,
  Divider
} from "@material-ui/core/";

import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import { Box } from "@material-ui/core";
import Activity from "./Activity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateItinerary } from "../../../store/actions/itineraryAction";
import {
  addFavorite,
  removeFavorite
} from "../../../store/actions/favoriteActions";
import { loadUser } from "../../../store/actions/authActions";

class ItineraryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };

    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };
  componentDidMount = () => {
    this.props.loadUser();
  };

  addFavorite = () => {
    console.log("add");
    const favorite = {
      favorite: this.props.itinerary._id,
      user: this.props.auth.user
    };

    this.props.addFavorite(favorite);
    this.props.loadUser();
  };

  removeFavorite = () => {
    console.log("remove");
    const favorite = {
      favorite: this.props.itinerary._id,
      user: this.props.auth.user._id
    };

    this.props.removeFavorite(favorite);
    this.props.loadUser();
  };

  render() {
    const { expanded } = this.state;
    const itinerary = this.props.itinerary;

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar alt={itinerary.user.name} src={itinerary.user.image} />
          }
          action={
            <IconButton
              aria-label="Settings"
              onClick={
                this.props.auth.user.favorites.includes(itinerary._id)
                  ? this.removeFavorite
                  : this.addFavorite
              }
            >
              <FontAwesomeIcon
                style={{
                  color: this.props.auth.user.favorites.includes(itinerary._id)
                    ? "red"
                    : "grey"
                }}
                icon="heart"
              />
            </IconButton>
          }
          title={itinerary.title}
          subheader={itinerary.user.name}
        />

        <CardContent>
          <Grid
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
            onClick={this.handleExpandClick}
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
  }
}

ItineraryCard.propTypes = {
  updateItinerary: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  favorites: state.favorites
});

export default connect(
  mapStateToProps,
  { updateItinerary, addFavorite, removeFavorite, loadUser }
)(ItineraryCard);
