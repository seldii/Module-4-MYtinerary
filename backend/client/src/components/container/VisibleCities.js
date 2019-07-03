import React, { Component } from "react";
import Cities from "../pages/Cities";
import { connect } from "react-redux";
import { getCities } from "../../actions/cityActions";
import PropTypes from "prop-types";

class VisibleCities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCities: []
    };
  }

  componentWillMount() {
    this.props.getCities();
  }

  render() {
    return <Cities />;
  }
}

VisibleCities.propTypes = {
  getCities: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  city: state.city
});

export default connect(
  mapStateToProps,
  { getCities }
)(VisibleCities);
