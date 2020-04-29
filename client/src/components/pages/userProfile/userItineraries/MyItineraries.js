import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ItineraryCard from "../../Itinerary/ItineraryCard";
import { Divider } from "@material-ui/core/";
import { loadUser } from "../../../../store/actions/authActions";
import { getItinerariesByUser } from "../../../../store/actions/itineraryAction";
import Footer from "../../../layout/Footer";
import NotFoundPage from "./NotFoundPage";

export class MyItineraries extends Component {
  componentDidMount() {
    const { getItinerariesByUser, getUser, auth } = this.props;
    getUser();
    getItinerariesByUser(auth.user?._id);
  }

  render() {
    const { itinerariesByUser } = this.props;
    let itineraryList;

    if (itinerariesByUser.length) {
      itineraryList = itinerariesByUser.map((i) => {
        return <ItineraryCard key={i._id} itinerary={i} />;
      });
    } else {
      itineraryList = <NotFoundPage />;
    }

    return (
      <React.Fragment>
        <Divider variant="middle" />
        {itineraryList}
        <Footer />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  itinerariesByUser: state.itineraries.itinerariesByUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getItinerariesByUser: (userId) => {
      dispatch(getItinerariesByUser(userId));
    },

    getUser: () => {
      dispatch(loadUser());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyItineraries)
);
