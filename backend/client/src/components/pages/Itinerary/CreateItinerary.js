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
      hashtag: [],
      user: "",
      title: "",
      city: "",
      profilePic: "",
      rating: null,
      duration: null,
      price: null
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
      hashtag: this.state.hashtag,
      title: this.state.title,
      city: this.state.city,
      duration: this.state.duration,
      price: this.state.price
    };

    //Add City via addCity action
    this.props.createItinerary(newItinerary);

    //Clear form
    this.setState({
      itinerary: null,
      hashtag: [],
      title: "",
      city: "",
      rating: null,
      duration: null,
      price: null
    });
  }

  update(e) {
    e.preventDefault();

    const id = this.state.itinerary._id;
    const itinerary = {
      hashtag: this.state.hashtag,
      title: this.state.title,
      city: this.state.city,
      duration: this.state.duration,
      price: this.state.price
    };

    //Update City via updateCity action
    this.props.updateItinerary(id, itinerary);

    // Clear form
    this.setState({
      itinerary: null
    });
  }
  onChange(e) {
    console.log(this.state);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  displayItinerary(property) {
    this.setState({
      hashtag: property.hashtag,
      title: property.title,
      city: property.city,
      duration: property.duration,
      price: property.price
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
        <form>
          {["title", "city", "duration", "price"].map(query => (
            <TextField
              id="outlined-name"
              type="text"
              name={query}
              label={query}
              variant="outlined"
              style={{ marginBottom: 8 }}
              helperText=""
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              value={this.state.query}
              onChange={this.onChange}
            />
          ))}
          <Button
            form="city-creator"
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
  itinerary: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  itineraries: state.itineraries,
  itinerary: state.itineraries.itinerary
});

export default connect(
  mapStateToProps,
  { getItineraries, createItinerary, updateItinerary, setError }
)(CreateItinerary);
