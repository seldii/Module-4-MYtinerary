import React, { Component } from "react";
import {
  getItinerariesByUser,
  createItinerary,
  updateItinerary
} from "../../../store/actions/itineraryAction";
import { setError } from "../../../store/actions/errorActions";
import { getCities } from "../../../store/actions/cityActions";
import ErrorMessage from "../../common/ErrorMessage";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ItineraryCreatorCard from "./ItineraryCreatorCard";
import {
  TextField,
  Typography,
  Button,
  Divider,
  MenuItem
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ActivityInputs from "./ActivityInputs";
import LogInModal from "../../Auth/LogInModal";
import { Link } from "react-router-dom";

const styles = theme => ({
  button: {
    color: theme.palette.primary.main
  },
  title: {
    color: theme.palette.secondary.main,
    textAlign: "center"
  }
});

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
    if (this.props.auth.user) {
      const { user } = this.props.auth;
      this.props.getItinerariesByUser(user.name);
    }
    this.props.getCities();
  }

  /* componentWillReceiveProps(nextProps) {
    if (this.props.match.params !== nextProps.match.params) {
      this.props.getItinerariesByUser(nextProps.match.params);
    }
  } */
  async onSubmit(e) {
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
    await this.props.createItinerary(newItinerary);

    //Clear form
    await this.setState({
      hashtag: [],
      title: "",
      city: "",
      duration: null,
      price: null,
      activities: [{ description: "", image: "" }]
    });
  }

  async update(e) {
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
    await this.props.updateItinerary(id, newItinerary);
    await this.setState({
      hashtag: [],
      title: "",
      city: "",
      duration: null,
      price: null,
      activities: [{ description: "", image: "" }]
    });
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
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addActivity = event => {
    this.setState(prevState => ({
      activities: [...prevState.activities, { description: "", image: "" }]
    }));
  };

  displayItinerary(property) {
    this.setState({
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
    let itineraries = this.props.itinerariesByUser;

    if (itineraries) {
      itineraryList = itineraries.map((itinerary, _id) => {
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

    return this.props.auth.isAuthenticated ? (
      <div>
        <Typography variant="h4" className={this.props.classes.title}>
          Itinerary Creator
        </Typography>
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
            onChange={this.onChange.bind(this)}
            select
            id="city"
            name="city"
            value={city}
            fullWidth
            style={{ marginBottom: 8 }}
          >
            {this.props.cities.map(city => (
              <MenuItem key={city.name} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </TextField>

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
          <TextField
            label="Hashtags"
            id="hashtag"
            type="text"
            name="hashtag"
            value={hashtag || ""}
            helperText="#cityname"
            fullWidth
            style={{ marginBottom: 8 }}
          />

          <Divider />
          <Button
            type="button"
            onClick={this.addActivity}
            variant="contained"
            size="medium"
            className={this.props.classes.button}
          >
            Add new activity
          </Button>
          <ActivityInputs activities={activities} />
          <Button
            type="submit"
            form="itinerary-creator"
            fullWidth
            variant="contained"
            size="medium"
            className={this.props.classes.button}
          >
            Submit
          </Button>
        </form>
        {itineraryList}
      </div>
    ) : (
      <div>
        Please <LogInModal /> or <Link to="/">Register</Link>
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
  auth: state.auth,
  cities: state.cities.cities
});

export default connect(
  mapStateToProps,
  {
    getItinerariesByUser,
    createItinerary,
    setError,
    updateItinerary,
    getCities
  }
)(withStyles(styles, { withTheme: true })(CreateItinerary));
