import React, { Component } from "react";
import { getItinerariesByCity } from "../../store/actions/itineraryAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ItineraryCard from "../pages/Itinerary/ItineraryCard";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Footer from "../layout/Footer";

export class City extends Component {
  componentDidMount() {
    const { cityName } = this.props.match.params;
    this.props.getItinerariesByCity(cityName);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params !== nextProps.match.params) {
      this.props.getItinerariesByCity(nextProps.match.params);
    }
  }

  render() {
    let itineraryList;

    if (this.props.itinerariesByCity) {
      itineraryList = this.props.itinerariesByCity.map(i => {
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

City.propTypes = {
  getItinerariesByCity: PropTypes.func.isRequired,
  itinerariesByCity: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  itinerariesByCity: state.itineraries.itinerariesByCity
});

export default withRouter(
  connect(
    mapStateToProps,
    { getItinerariesByCity }
  )(City)
);
