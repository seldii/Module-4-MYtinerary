import React, { Component } from "react";
import { connect } from "react-redux";
import { getItinerariesByUser } from "../../../store/actions/itineraryAction";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import ItineraryCard from "../../pages/Itinerary/ItineraryCard";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Footer from "../../layout/Footer";

export class MyItineraries extends Component {
  componentDidMount() {
    console.log(this.props.auth);
    const { user } = this.props.auth;
    console.log(user.name);
    this.props.getItinerariesByUser(user.name);
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.match);
    if (this.props.match.params !== nextProps.match.params) {
      this.props.getItinerariesByUser(nextProps.match.params);
    }
    console.log(this.props.itinerariesByUser);
  }

  render() {
    let itineraryList;

    if (this.props.itinerariesByUser) {
      itineraryList = this.props.itinerariesByUser.map(i => {
        return <ItineraryCard key={i._id} itinerary={i} />;
      });
    } else {
      itineraryList = <div>Not found</div>;
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box
          style={{
            margin: "auto",
            textAlign: "center"
          }}
          component="div"
        >
          <Typography component="h2" variant="h5">
            {this.props.match.params.cityName}
          </Typography>
        </Box>
        <Divider variant="middle" />
        {itineraryList}
        <Footer />
      </div>
    );
  }
}

MyItineraries.propTypes = {
  getItinerariesByUser: PropTypes.func.isRequired,
  itinerariesByUser: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  itinerariesByUser: state.itineraries.itinerariesByUser,
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { getItinerariesByUser }
  )(MyItineraries)
);
