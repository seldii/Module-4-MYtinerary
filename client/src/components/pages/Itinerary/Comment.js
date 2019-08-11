import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateItinerary } from "../../../store/actions/itineraryAction";
import TextField from "@material-ui/core/TextField";
import { getCurrentDate } from "../../utility/GetCurrentDate";
import CommentsList from "./CommentsList";
import { withStyles } from "@material-ui/core/styles/";

const styles = theme => ({
  sent: {
    color: theme.palette.secondary.main,
    fontSize: "xx-large"
  }
});
export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      comment: "",
      comments: this.props.itinerary.comments
    };

    this.update = this.update.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  update(e) {
    e.preventDefault();

    const id = this.props.itinerary._id;
    const prevItinerary = this.props.itinerary;
    const prevComments = this.props.itinerary.comments;
    const newDate = getCurrentDate();
    const comment = {
      user: this.props.auth.user,
      comment: this.state.comment,
      date: newDate
    };

    const comments = [...prevComments, comment];
    const itinerary = {
      ...prevItinerary,
      comments
    };

    //Update City via updateCity action
    this.props.updateItinerary(id, itinerary);
    this.setState({
      comments
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const comments = this.state.comments
      .sort((a, b) => {
        let x = new Date(a.date);
        let y = new Date(b.date);
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }

        return 0;
      })
      .reverse();
    const commentList = comments.map((comment, idx) => {
      return <CommentsList key={idx} comment={comment} />;
    });
    return (
      <div>
        <form onSubmit={this.update} onChange={this.onChange}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={10}>
              <TextField
                disabled={!this.props.auth.isAuthenticated}
                placeholder={
                  this.props.auth.isAuthenticated
                    ? "Write a comment.."
                    : "Login to leave a comment"
                }
                value={this.state.comment}
                name="comment"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}>
              <Button type="submit">
                <FontAwesomeIcon
                  className={this.props.classes.sent}
                  icon="paper-plane"
                />
              </Button>
            </Grid>
          </Grid>
        </form>

        {commentList}
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
)(withStyles(styles, { withTheme: true })(Comment));
