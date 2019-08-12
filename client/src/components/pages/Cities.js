import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col } from "reactstrap";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles/";
import { Typography, ButtonBase, Grid } from "@material-ui/core/";
import { connect } from "react-redux";
import { getCities } from "../../store/actions/cityActions";
import PropTypes from "prop-types";
import Footer from "../layout/Footer";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  cityList: {
    marginBottom: "60px",
    padding: 0
  },
  image: {
    position: "relative",
    height: 200,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0
      },

      "& $imageTitle": {
        border: "2px solid currentColor",
        opacity: 1,
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(
          1
        ) + 6}px`
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.2,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.6,
    position: "relative",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(1) +
      3}px`,
    transition: theme.transitions.create("opacity")
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
    const classes = this.props.classes;
    let cityList;
    const { cities } = this.props.cities;
    let filteredCities = cities.filter(city => {
      let cityName = city.name.toLowerCase();
      return cityName.indexOf(this.state.searchCity) !== -1;
    });
    if (!this.state.isLoading) {
      cityList = filteredCities.map((city, _id) => {
        return (
          <Grid key={_id} item style={{ width: "100%" }}>
            <div className={classes.root}>
              <ButtonBase
                focusRipple
                key={city.name}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: city.image.width
                }}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${city.image})`
                  }}
                />
                <span className={classes.imageBackdrop} />
                <Link
                  key={_id}
                  to={{ pathname: `/cities/${city.name}` }}
                  params={{ cityName: city.name }}
                >
                  <span className={classes.imageButton}>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="inherit"
                      className={classes.imageTitle}
                    >
                      {city.name}
                      <span className={classes.imageMarked} />
                    </Typography>
                  </span>
                </Link>
              </ButtonBase>
            </div>
          </Grid>
        );
      });
    } else {
      cityList = <div>Loading..</div>;
    }
    return (
      <div>
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
        <Grid
          container
          spacing={1}
          direction="column"
          justify="center"
          alignItems="center"
        >
          {cityList}
        </Grid>

        <Footer />
      </div>
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
