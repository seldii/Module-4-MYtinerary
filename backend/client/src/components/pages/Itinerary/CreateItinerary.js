import React, { Component, Fragment } from "react";
import {
  getItinerariesByUser,
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
import Divider from "@material-ui/core/Divider";
import ActivityInputs from "./ActivityInputs";

export class CreateItinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtag: [],
      title: "",
      city: "",
      duration: null,
      price: null,
      activities: [{ description: "", image: "" }]
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.displayItinerary = this.displayItinerary.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
  }
  componentDidMount() {
    const { user } = this.props.auth;

    this.props.getItinerariesByUser(user.name);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params !== nextProps.match.params) {
      this.props.getItinerariesByUser(nextProps.match.params);
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const newItinerary = {
      user: this.props.auth.user,
      hashtag: this.state.hashtag,
      title: this.state.title,
      city: this.state.city,
      duration: this.state.duration,
      price: this.state.price,
      activities: this.state.activities
    };

    //Add Itinerary via createItinerary action
    this.props.createItinerary(newItinerary);

    //Clear form
    this.setState({
      hashtag: [],
      title: "",
      city: "",
      currentItinerary: "",
      duration: null,
      price: null,
      activities: [{ description: "", image: "" }]
    });
  }

  update(e) {
    e.preventDefault();

    const id = this.props.itinerary._id;
    const newItinerary = {
      user: this.props.auth.user,
      hashtag: this.state.hashtag,
      title: this.state.title,
      city: this.state.city,
      duration: this.state.duration,
      price: this.state.price,
      activities: this.state.activities
    };

    //Update Itinerary via updateItinerary action
    this.props.updateItinerary(id, newItinerary);
  }

  handleChange = e => {
    if (["description", "image"].includes(e.target.dataset.fieldType)) {
      let activities = [...this.state.activities];
      activities[e.target.dataset.id][e.target.dataset.fieldType] =
        e.target.value;
      this.setState({ activities }, () => console.log(this.state.activities));
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  addActivity = event => {
    this.setState(prevState => ({
      activities: [...prevState.activities, { description: "", image: "" }]
    }));
  };

  displayItinerary(property) {
    this.setState({
      itinerary: property,
      hashtag: property.hashtag,
      title: property.title,
      city: property.city,
      duration: property.duration,
      price: property.price,
      activities: property.activities
    });
  }
  render() {
    let itineraryList;

    if (this.props.itinerariesByUser) {
      itineraryList = this.props.itinerariesByUser.map((itinerary, _id) => {
        return (
          <ItineraryCreatorCard
            key={_id}
            itinerary={itinerary}
            displayItinerary={this.displayItinerary}
          />
        );
      });
    } else {
      itineraryList = <div>Not found</div>;
    }

    let { title, city, activities, duration, price, hashtag } = this.state;

    return (
      <div>
        <h2>Itinerary Creator</h2>
        <ErrorMessage />
        <form
          id="itinerary-creator"
          onSubmit={this.props.itinerary ? this.update : this.onSubmit}
          onChange={this.handleChange}
        >
          <TextField
            label="Title"
            id="Title"
            type="text"
            name="title"
            value={title || ""}
            fullWidth
            style={{ marginBottom: 8 }}
          />

          <TextField
            label="City"
            id="city"
            type="text"
            name="city"
            value={city || ""}
            fullWidth
            style={{ marginBottom: 8 }}
          />
          <TextField
            label="Duration"
            id="Duration"
            type="text"
            name="duration"
            value={duration || ""}
            helperText="How many hours?"
            fullWidth
            style={{ marginBottom: 8 }}
          />

          <TextField
            label="Price"
            id="price"
            type="text"
            name="price"
            value={price || ""}
            helperText="Please enter the cost in Euro"
            fullWidth
            style={{ marginBottom: 8 }}
          />

          <Divider />
          <Button
            type="button"
            onClick={this.addActivity}
            variant="contained"
            size="medium"
            style={{ color: "#FF6347" }}
          >
            Add new activity
          </Button>
          <ActivityInputs activities={activities} />
          <Button
            type="submit"
            form="itinerary-creator"
            fullWidth
            variant="contained"
            size="small"
            variant="contained"
            size="medium"
            style={{ color: "#FF6347" }}
          >
            Submit
          </Button>
        </form>
        {itineraryList}
      </div>
    );
  }
}

CreateItinerary.propTypes = {
  createItinerary: PropTypes.func.isRequired,
  getItinerariesByUser: PropTypes.func.isRequired,
  itinerariesByUser: PropTypes.arrayOf(PropTypes.object).isRequired,

  auth: PropTypes.object.isRequired,
  updateItinerary: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  itinerariesByUser: state.itineraries.itinerariesByUser,
  itinerary: state.itineraries.itinerary,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getItinerariesByUser, createItinerary, setError, updateItinerary }
)(CreateItinerary);
