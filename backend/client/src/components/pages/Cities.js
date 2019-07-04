import React, { Component } from "react";

import {
  Container,
  Card,
  CardTitle,
  CardImg,
  CardImgOverlay,
  Row,
  Col
} from "reactstrap";

import { connect } from "react-redux";
import { getCities } from "../../store/actions/cityActions";
import PropTypes from "prop-types";
import _ from "lodash";

export class Cities extends Component {
  constructor() {
    super();
    this.state = { searchCity: "" };
  }

  componentDidMount() {
    this.props.getCities();
  }

  filterCity = event => {
    this.setState({ searchCity: event.target.value.toLowerCase() });
  };

  render() {
    let cityList;
    console.log(this.props.city);
    const { cities } = this.props.city;
    let filteredCities = cities.filter(city => {
      let cityName = city.name.toLowerCase();
      return cityName.indexOf(this.state.searchCity) !== -1;
    });
    if (filteredCities) {
      cityList = filteredCities.map(city => {
        return (
          <Card inverse>
            <CardImg width="100%" src={city.image} alt="Card image cap" />
            <CardImgOverlay style={{ display: "flex" }}>
              <CardTitle
                style={{
                  textAlign: "center",
                  width: "100%",
                  alignSelf: "center",
                  backgroundColor: "rgba(255,255,255,0.5)",
                  marginBottom: "0px"
                }}
              >
                {city.name}
              </CardTitle>
            </CardImgOverlay>
          </Card>
        );
      });
    } else {
      cityList = <div>Loading..</div>;
    }
    return (
      <Container>
        <Row>
          <Col xs="12">
            <input
              style={{ width: "100%" }}
              type="text"
              value={this.state.searchCity}
              placeholder="Search"
              onChange={this.filterCity.bind(this)}
            />
          </Col>
        </Row>

        {cityList}
      </Container>
    );
  }
}

Cities.propTypes = {
  getCities: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  city: state.city
});

export default connect(
  mapStateToProps,
  { getCities }
)(Cities);
