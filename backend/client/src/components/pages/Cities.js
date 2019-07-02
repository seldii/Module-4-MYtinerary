import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardTitle,
  CardImg,
  CardImgOverlay
} from "reactstrap";

import { connect } from "react-redux";
import { getCities } from "../../actions/cityActions";
import PropTypes from "prop-types";

export class Cities extends Component {
  /* constructor(props) {
    super(props);
    this.state = { cities: [] };
  } */

  componentDidMount() {
    this.props.getCities();
    axios
      .get("/cities")
      .then(res => {
        this.setState({ cities: res.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    let cityList;
    const { cities } = this.props.city;
    if (cities) {
      cityList = cities.map(city => {
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
    return <Container style={{ marginTop: "15px" }}>{cityList}</Container>;
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
