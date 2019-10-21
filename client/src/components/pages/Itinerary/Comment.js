import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addComment,
  deleteComment
} from "../../../store/actions/commentActions";
import { getItinerary } from "../../../store/actions/itineraryAction";
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
      comment: "",
      comments: this.props.itinerary.comments
    };

    this.addComment = this.addComment.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    const id = this.props.itinerary._id;
    this.props.getItinerary(id);
  }
  componentDidMount() {}

  async addComment(e) {
    e.preventDefault();
    const uuidv4 = require("uuid/v4");
    const id = this.props.itinerary._id;
    const newDate = getCurrentDate();
    const comment = {
      user: {
        name: this.props.auth.user.name,
        image: this.props.auth.user.image,
        _id: this.props.auth.user._id
      },
      comment: this.state.comment,
      date: newDate,
      id: uuidv4()
    };

    //Add comment via addComment action
    await this.props.addComment(id, comment);

    await getItinerary(id); //set the itinerary in redux state

    this.setState({
      comment: "",
      comments: this.props.itineraryRed.comments
    });
  }

  async handleDelete(comment) {
    const id = this.props.itinerary._id;
    await this.props.deleteComment(id, comment);
    await getItinerary(this.props.itinerary._id);

    this.setState({
      comment: "",
      comments: this.props.itineraryRed.comments
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let comments;

    if (this.props.itineraryRed) {
      comments = this.props.itineraryRed.comments
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
    } else {
      comments = this.state.comments
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
    }

    const commentList = comments.map((comment, idx) => {
      return (
        <CommentsList
          key={idx}
          comment={comment}
          handleDelete={() => this.handleDelete(comment)}
        />
      );
    });
    return (
      <div>
        <form onSubmit={this.addComment} onChange={this.onChange}>
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
        <Typography variant="body2" color="secondary">
          Comments
        </Typography>
        {commentList}
      </div>
    );
  }
}

Comment.propTypes = {
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  getItinerary: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  itineraryRed: state.itineraries.itinerary
});

export default connect(
  mapStateToProps,
  { addComment, deleteComment, getItinerary }
)(withStyles(styles, { withTheme: true })(Comment));
