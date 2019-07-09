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
import Input from "@material-ui/core/Input";

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

    const { cities } = this.props.cities;
    let filteredCities = cities.filter(city => {
      let cityName = city.name.toLowerCase();
      return cityName.indexOf(this.state.searchCity) !== -1;
    });
    if (filteredCities) {
      cityList = filteredCities.map((city, _id) => {
        return (
          <Card inverse key={_id}>
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
            <Input
              style={{ width: "100%" }}
              type="search"
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
  cities: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cities: state.cities
});

export default connect(
  mapStateToProps,
  { getCities }
)(Cities);
