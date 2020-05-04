import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ItineraryCard from "../../../pages/Itinerary/ItineraryCard";
import Divider from "@material-ui/core/Divider";
import * as actionCreators from "../../../../store/actions/index";
import Footer from "../../../layout/Footer";
import NotFoundPage from "./NotFoundPage";

export class FavoriteItineraries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favItineraries: [],
    };
  }

  componentDidMount() {
    this.props.getUser();
    this.props.initItineraries();
    this.getFavoriteItineraries();
  }

  getFavoriteItineraries = async () => {
    const { auth } = await this.props;
    console.log(auth.user);
    await this.props.getFavoriteItineraries(auth.user);
  };

  render() {
    console.log(this.props.favorites);
    return (
      <React.Fragment>
        <Divider />
        {this.props.itineraries &&
          this.props.itineraries.map((i) => (
            <ItineraryCard key={i._id} itinerary={i} />
          ))}
        <Footer />
      </React.Fragment>
    );
  }
}

FavoriteItineraries.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  itineraries: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    favorites: state.favorites.favorites,
    itineraries: state.itineraries.itineraries,
  };
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    getUser: () => {
      dispatch(actionCreators.loadUser());
    },
    initItineraries: () => {
      dispatch(actionCreators.getItineraries());
    },

    getFavoriteItineraries: (user) => {
      dispatch(actionCreators.fetchFavorites(user));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FavoriteItineraries)
);
