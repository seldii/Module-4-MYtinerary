import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
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
import { withStyles } from "@material-ui/core/styles/";
import { Typography } from "@material-ui/core/";
import { connect } from "react-redux";
import { getCities } from "../../store/actions/cityActions";
import PropTypes from "prop-types";
import Footer from "../layout/Footer";

const styles = theme => ({
  root: {},
  cardTitle: {
    textAlign: "center",
    width: "100%",
    alignSelf: "center",
    backgroundColor: "rgba(255,145,0,0.5)",
    marginBottom: "0px",
    color: theme.palette.primary.contrastText
  },
  cityList: {
    marginBottom: "60px",
    padding: 0
  },
  image: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100
    },
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  }
});

export class Cities extends Component {
  constructor() {
    super();
    this.state = { searchCity: "", isLoading: true };
  }

  componentDidMount() {
    this.props.getCities();
    this.setState({
      isLoading: false
    });
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
    if (!this.state.isLoading) {
      cityList = filteredCities.map((city, _id) => {
        return (
          <Link
            key={_id}
            to={{ pathname: `/cities/${city.name}` }}
            params={{ cityName: city.name }}
          >
            <Card inverse key={_id}>
              <CardImg
                className={this.props.classes.image}
                width="100%"
                src={city.image}
                alt="Card image cap"
              />
              <CardImgOverlay style={{ display: "flex" }}>
                <CardTitle className={this.props.classes.cardTitle}>
                  <Typography variant="subtitle1">{city.name}</Typography>
                </CardTitle>
              </CardImgOverlay>
            </Card>
          </Link>
        );
      });
    } else {
      cityList = <div>Loading..</div>;
    }
    return (
      <Container fluid className={this.props.classes.root}>
        <Container fluid className={this.props.classes.cityList}>
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
        <Footer />
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

const mapDispatchToProps = dispatch => {
  return {
    getItinerariesByCity: cityName => {
      dispatch({
        type: "GET_ITINERARIES_BY_CITYNAME",
        cityName: cityName
      });
    },
    getCities: () => {
      dispatch(getCities());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(Cities))
);
