import React, { Component } from "react";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import { Form, Button } from "reactstrap";
import { connect } from "react-redux";
import { addCity } from "../../store/actions/cityActions";
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
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);

    const newCity = this.state;

    //Add City via addCity action
    this.props.addCity(newCity);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>City Creator</h1>
        <Form onSubmit={this.onSubmit}>
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

          <Button fullWidth variant="contained" size="small">
            <SaveIcon />
            Save
          </Button>
        </Form>
      </div>
    );
  }
}

CityCreator.propTypes = {
  addCity: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  city: state.city
});

export default connect(
  mapStateToProps,
  { addCity }
)(CityCreator);
