import React, { Component } from "react";
import { getItinerariesByCity } from "../../store/actions/itineraryAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class City extends Component {
  componentDidMount() {
    console.log(this.props.match.params);
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
    console.log(this.props.itinerariesByCity);

    if (this.props.itinerariesByCity) {
      itineraryList = this.props.itinerariesByCity.map(i => {
        return <h6>{i.title}</h6>;
      });
    } else {
      itineraryList = <div>Not found</div>;
    }
    return <div>{itineraryList}</div>;
  }
}

City.propTypes = {
  getItinerariesByCity: PropTypes.func.isRequired,
  itinerariesByCity: PropTypes.object.isRequired
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
