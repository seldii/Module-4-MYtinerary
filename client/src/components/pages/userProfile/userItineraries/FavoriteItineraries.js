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
  }

  getFavoriteItineraries = () => {
    const { itineraries, auth } = this.props;
    const { favorites } = auth?.user;

    console.log({ itineraries });

    const favItineraries = itineraries
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
    itineraries: state.itineraries.itineraries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initItineraries: () => {
      dispatch(actionCreators.getItineraries());
    },

    getUser: () => {
      dispatch(actionCreators.loadUser());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FavoriteItineraries)
);
