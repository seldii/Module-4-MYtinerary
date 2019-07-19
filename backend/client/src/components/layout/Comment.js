import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateItinerary } from "../../store/actions/itineraryAction";
import TextField from "@material-ui/core/TextField";

export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      comment: ""
    };

    this.update = this.update.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  update(e) {
    e.preventDefault();

    const id = this.props.itinerary._id;
    const prevItinerary = this.props.itinerary;
    console.log(prevItinerary);
    const comment = {
      user: this.props.auth.user,
      comment: this.state.comment
    };
    const itinerary = {
      ...prevItinerary,
      comment
    };

    //Update City via updateCity action
    this.props.updateItinerary(id, itinerary);
  }
  onChange(e) {
    console.log(this.state.comment);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Typography>Comments:</Typography>
        <form onSubmit={this.update} onChange={this.onChange}>
          <TextField
            placeholder="Your comment"
            value={this.state.comment}
            name="comment"
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}

Comment.propTypes = {
  updateItinerary: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateItinerary }
)(Comment);
