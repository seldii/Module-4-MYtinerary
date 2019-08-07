import React, { Component } from "react";
import { Link } from "react-router-dom";
import CityCreatorCard from "./CityCreatorCard";
import { getCities } from "../../store/actions/cityActions";
import SaveIcon from "@material-ui/icons/Save";
import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { addCity, updateCity } from "../../store/actions/cityActions";
import { setError } from "../../store/actions/errorActions";
import ErrorMessage from "../common/ErrorMessage";
import PropTypes from "prop-types";
import LogInModal from "../Auth/LogInModal";

const styles = theme => ({
  button: {
    color: theme.palette.secondary.main
  },
  title: {
    color: theme.palette.secondary.main,
    textAlign: "center"
  }
});

class CityCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      country: "",
      image: "",
      city: null
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.displayCity = this.displayCity.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.props.getCities();
  }
  onSubmit(e) {
    e.preventDefault();

    const newCity = {
      name: this.state.name,
      country: this.state.country,
      image: this.state.image,
      user: this.props.auth.user
    };

    //Add City via addCity action
    this.props.addCity(newCity);

    //Clear form
    this.setState({
      name: "",
      country: "",
      image: ""
    });
  }

  update(e) {
    e.preventDefault();

    const id = this.state.city._id;
    const city = {
      name: this.state.name,
      country: this.state.country,
      image: this.state.image
    };

    //Update City via updateCity action
    this.props.updateCity(id, city);

    // Clear form
    this.setState({
      city: null
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  displayCity(property) {
    this.setState({
      city: property,
      name: property.name,
      country: property.country,
      image: property.image
    });
  }

  render() {
    let cityList;
    const cities = this.props.cities.cities.filter(city => {
      if (city.user) {
        return city.user._id === this.props.auth.user._id;
      } else {
        return "";
      }
    });
    cityList = cities.map((city, _id) => {
      return (
        <CityCreatorCard key={_id} city={city} displayCity={this.displayCity} />
      );
    });
    return this.props.auth.isAuthenticated ? (
      <div>
        <Typography variant="h4" className={this.props.classes.title}>
          City Creator
        </Typography>
        <ErrorMessage />
        <form
          id="city-creator"
          onSubmit={this.state.city === null ? this.onSubmit : this.update}
          style={{ marginBottom: "1rem" }}
        >
          <TextField
            required
            id="outlined-name"
            type="text"
            name="name"
            label="Name"
            style={{ marginBottom: 8 }}
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            value={this.state.name}
            onChange={this.onChange}
          />
          <TextField
            required
            id="outlined-name"
            type="text"
            name="country"
            label="Country"
            style={{ marginBottom: 8 }}
            helperText="Enter 2-letter Country Code"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            value={this.state.country}
            onChange={this.onChange}
          />
          <TextField
            required
            id="outlined-name"
            type="text"
            name="image"
            label="Image"
            helperText="Enter a valid url"
            fullWidth
            style={{ marginBottom: 8 }}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            value={this.state.image}
            onChange={this.onChange}
          />

          <Button
            form="city-creator"
            fullWidth
            variant="contained"
            size="small"
            type="submit"
            className={this.props.classes.button}
          >
            <SaveIcon style={{ color: "#FF6347" }} />
            Save
          </Button>
        </form>
        <div>{cityList}</div>
      </div>
    ) : (
      <div>
        Please <LogInModal /> or <Link to="/">Register</Link>
      </div>
    );
  }
}

CityCreator.propTypes = {
  addCity: PropTypes.func.isRequired,
  updateCity: PropTypes.func.isRequired,
  cities: PropTypes.object.isRequired,
  getCities: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cities: state.cities,
  city: state.cities.city,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addCity, getCities, setError, updateCity }
)(withStyles(styles, { withTheme: true })(CityCreator));
