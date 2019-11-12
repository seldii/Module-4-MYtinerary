import React, { Component } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../../../store/actions/authActions";
import {
  getItinerariesByUser,
  getItineraries
} from "../../../../store/actions/itineraryAction";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ItineraryCard from "../../../pages/Itinerary/ItineraryCard";
import Divider from "@material-ui/core/Divider";
import Footer from "../../../layout/Footer";
import NotFoundPage from "./NotFoundPage";

export class MyItineraries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraries: null
    };
    this.getItineraries();
  }

  getItineraries = async () => {
    let itinerariesSet = new Set();
    const itineraries = await this.props.itineraries;
    for (let i of itineraries) {
      itinerariesSet.add(i._id);
    }
    await this.setState({
      itineraries: itinerariesSet
    });
  };

  render() {
    let favItineraries = [];
    let itineraryList;
    const { favorites } = this.props.auth.user;
    if (this.state.itineraries) {
      for (let fav of favorites) {
        if (this.state.itineraries.has(fav)) {
          for (let i of this.props.itineraries) {
            if (i._id === fav) favItineraries.push(i);
          }
        }
      }

      if (!favItineraries.length) {
        itineraryList = <NotFoundPage />;
      } else {
        itineraryList = favItineraries.map(i => {
          return <ItineraryCard key={i._id} itinerary={i} />;
        });
      }
    } else {
      itineraryList = <div>Loading...</div>;
    }

    return (
      <React.Fragment>
        <Divider />
        {itineraryList}
        <Footer />
      </React.Fragment>
    );
  }
}

MyItineraries.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  itineraries: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    itineraries: state.itineraries.itineraries
  };
};

export default withRouter(
  connect(mapStateToProps, { loadUser, getItinerariesByUser, getItineraries })(
    MyItineraries
  )
);
