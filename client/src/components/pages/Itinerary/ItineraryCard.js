import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  CardActions
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
import {
  updateItinerary,
  getItinerary
} from "../../../store/actions/itineraryAction";
import {
  addFavorite,
  removeFavorite
} from "../../../store/actions/favoriteActions";
import { loadUser } from "../../../store/actions/authActions";
import { withStyles } from "@material-ui/core/styles/";

const styles = theme => ({
  expandText: {
    color: theme.palette.secondary.main,
    textDecoration: "underline"
  }
});

class ItineraryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      favorite: true
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

    let favIds;
    if (this.props.auth.isAuthenticated) {
      favIds = this.props.auth.user.favorites.map(fav => {
        return fav._id;
      });
    }
    if (favIds.includes(this.props.itinerary._id)) {
      this.setState({ favorite: true });
    } else {
      this.setState({ favorite: false });
    }
  };

  addFavorite = async () => {
    const favorite = {
      favorite: this.props.itinerary,
      user: this.props.auth.user
    };

    await this.props.addFavorite(favorite);
    await this.props.loadUser();
    this.setState({ favorite: true });
  };

  removeFavorite = async () => {
    const favorite = {
      favorite: this.props.itinerary,
      user: this.props.auth.user._id
    };

    await this.props.removeFavorite(favorite);
    await this.props.loadUser();
    this.setState({ favorite: false });
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
                this.props.auth.isAuthenticated
                  ? this.state.favorite
                    ? this.removeFavorite
                    : this.addFavorite
                  : null
              }
            >
              <FontAwesomeIcon
                style={{
                  color: this.props.auth.isAuthenticated
                    ? this.state.favorite
                      ? "#ff6d00"
                      : "rgb(220,220,220)"
                    : "rgb(220,220,220, 0.2)"
                }}
                icon="heart"
              />
            </IconButton>
          }
          title={itinerary.title}
          titleTypographyProps={{
            variant: "h5"
          }}
          subheader={"created by " + itinerary.user.name}
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
              <Typography variant="body1" component="div">
                Likes:{itinerary.rating || "-"}
              </Typography>
              <Typography variant="body1" component="div">
                {itinerary.duration || "-"} Hours
              </Typography>
              <Typography variant="body1" component="div">
                {(() => {
                  const x = itinerary.price;
                  switch (true) {
                    case x === null:
                      return "No price info";
                    case x === 0:
                      return "Free";
                    case x < 15:
                      return "$";
                    case x < 40:
                      return "$$";
                    case x < 60:
                      return "$$$";
                    case x > 60:
                      return "$$$$";
                    default:
                      return "";
                  }
                })()}
              </Typography>
            </Grid>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
              {itinerary.hashtag.length > 0 ? (
                itinerary.hashtag[0].split("," || "").map((h, index) => (
                  <Typography key={index} variant="body2">
                    {h}
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
            <Typography className={this.props.classes.expandText}>
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
  loadUser: PropTypes.func.isRequired,
  getItinerary: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  favorites: state.favorites
});

export default connect(
  mapStateToProps,
  { getItinerary, updateItinerary, addFavorite, removeFavorite, loadUser }
)(withStyles(styles, { withTheme: true })(ItineraryCard));
