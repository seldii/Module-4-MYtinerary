import React, { Component } from "react";
import CityCreatorCard from "./CityCreatorCard";
import { getCities } from "../../store/actions/cityActions";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addCity } from "../../store/actions/cityActions";
import { setError } from "../../store/actions/errorActions";
import ErrorMessage from "../common/ErrorMessage";
import PropTypes from "prop-types";
class CityCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      country: "",
      image: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.props.getCities();
  }
  onSubmit(e) {
    e.preventDefault();

    const newCity = this.state;

    //Add City via addCity action
    this.props.addCity(newCity);

    //Clear form
    this.setState({
      name: "",
      country: "",
      image: ""
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let cityList;
    const { cities } = this.props.city;
    cityList = cities.map((city, _id) => {
      return <CityCreatorCard key={_id} name={city.name} id={_id} />;
    });
    return (
      <div>
        <h1>City Creator</h1>
        <ErrorMessage />
        <form
          id="city-creator"
          onSubmit={this.onSubmit}
          style={{ marginBottom: "1rem" }}
        >
          <TextField
            required
            id="outlined-name"
            type="text"
            name="name"
            label="Name"
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
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
          >
            <SaveIcon />
            Save
          </Button>
        </form>
        <div>{cityList}</div>
      </div>
    );
  }
}

CityCreator.propTypes = {
  addCity: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired,
  getCities: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  city: state.city
});

export default connect(
  mapStateToProps,
  { addCity, getCities, setError }
)(CityCreator);
