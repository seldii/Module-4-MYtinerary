import React, { Component } from "react";
import {
  getItineraries,
  createItinerary,
  updateItinerary
} from "../../../store/actions/itineraryAction";
import { setError } from "../../../store/actions/errorActions";
import ErrorMessage from "../../common/ErrorMessage";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ItineraryCreatorCard from "./ItineraryCreatorCard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export class CreateItinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      formData: {
        hashtag: [],
        title: "",
        city: "",
        duration: null,
        price: null
      },
      profilePic: "",
      rating: null,
      itinerary: null
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.displayItinerary = this.displayItinerary.bind(this);
    this.update = this.update.bind(this);
  }
  componentDidMount() {
    this.props.getItineraries();
  }
  onSubmit(e) {
    e.preventDefault();

    const newItinerary = {
      user: this.props.auth.user._id,
      hashtag: this.state.formData.hashtag,
      title: this.state.formData.title,
      city: this.state.formData.city,
      duration: this.state.formData.duration,
      price: this.state.formData.price
    };

    //Add City via addCity action
    this.props.createItinerary(newItinerary);

    //Clear form
    this.setState({
      formData: {
        hashtag: [],
        title: "",
        city: "",
        duration: null,
        price: null
      }
    });
  }

  update(e) {
    e.preventDefault();

    const id = this.state.itinerary._id;
    const itinerary = {
      user: this.props.auth.user._id,
      hashtag: this.state.formData.hashtag,
      title: this.state.formData.title,
      city: this.state.formData.city,
      duration: this.state.formData.duration,
      price: this.state.formData.price
    };

    //Update City via updateCity action
    this.props.updateItinerary(id, itinerary);

    // Clear form
    this.setState({
      itinerary: null
    });
  }
  onChange(event) {
    const prevformData = this.state.formData;
    const {
      target: { name, value }
    } = event;
    const formData = { ...prevformData, [name]: value };

    this.setState({
      formData
    });
  }

  displayItinerary(property) {
    this.setState({
      itinerary: property,
      formData: {
        hashtag: property.hashtag,
        title: property.title,
        city: property.city,
        duration: property.duration,
        price: property.price
      }
    });
  }
  render() {
    let itineraryList;

    const { itineraries } = this.props.itineraries;

    itineraryList = itineraries.map((itinerary, _id) => {
      return (
        <ItineraryCreatorCard
          key={_id}
          itinerary={itinerary}
          displayItinerary={this.displayItinerary}
        />
      );
    });

    return (
      <div>
        <h2>Itinerary Creator</h2>
        <ErrorMessage />
        <form
          id="itinerary-creator"
          onSubmit={this.state.itinerary === null ? this.onSubmit : this.update}
          style={{ marginBottom: "1rem" }}
        >
          {Object.keys(this.state.formData).map((keyName, i) => (
            <TextField
              key={i}
              id="outlined-name"
              type="text"
              name={keyName}
              label={keyName}
              variant="outlined"
              style={{ marginBottom: 8 }}
              helperText=""
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              value={this.state.formData[keyName] || ""}
              onChange={this.onChange}
            />
          ))}
          <Button
            form="itinerary-creator"
            fullWidth
            variant="contained"
            size="small"
            type="submit"
          >
            Save
          </Button>
          {itineraryList}
        </form>
      </div>
    );
  }
}

CreateItinerary.propTypes = {
  createItinerary: PropTypes.func.isRequired,
  updateItinerary: PropTypes.func.isRequired,
  itineraries: PropTypes.object.isRequired,
  getItineraries: PropTypes.func.isRequired,
  itinerary: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  itineraries: state.itineraries,
  itinerary: state.itineraries.itinerary,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getItineraries, createItinerary, updateItinerary, setError }
)(CreateItinerary);
