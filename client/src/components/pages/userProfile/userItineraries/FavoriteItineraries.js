import React, { Component } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../../../store/actions/authActions";
import {
  getItinerariesByUser,
  getItineraries,
} from "../../../../store/actions/itineraryAction";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ItineraryCard from "../../../pages/Itinerary/ItineraryCard";
import Divider from "@material-ui/core/Divider";
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
    const { loadUser, getItineraries } = this.props;
    loadUser();
    getItineraries();
    this.getFavoriteItineraries();
  }

  getFavoriteItineraries = () => {
    const { itineraries, auth } = this.props;
    const { favorites } = auth?.user;

    console.log({ itineraries });

    const favItineraries = itineraries.length
      ? favorites?.map((favorite) => {
          console.log(favorite);
          return itineraries.find((i) => i._id === favorite);
        })
      : [];
    console.log(favItineraries);

    this.setState({ favItineraries });
  };

  render() {
    return (
      <React.Fragment>
        <Divider />
        {this.state.favItineraries.length &&
          this.state.favItineraries.map((i) => (
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
    itineraries: state.itineraries.itineraries,
  };
};

/* const mapDispatchToProps = (dispatch) => {
  return {
    getItinerariesByUser: (userId) => {
      dispatch(getItinerariesByUser(userId));
    },

    getItineraries: () => {
      dispatch(getItineraries());
    },

    getUser: () => {
      dispatch(loadUser());
    },
  };
}; */

export default withRouter(
  connect(mapStateToProps, { getItineraries, loadUser })(FavoriteItineraries)
);
