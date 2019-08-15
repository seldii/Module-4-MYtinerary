import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../../store/actions/commentActions";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import {
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline",
    color: theme.palette.secondary.main
  },
  date: {
    display: "block",
    color: theme.palette.secondary.light,
    opacity: "0.8"
  }
}));

const CommentsList = ({ comment, auth, handleDelete }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={comment.user.name} src={comment.user.image} />
        </ListItemAvatar>
        <ListItemText
          primary={comment.comment.toString()}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="caption"
                className={classes.inline}
              >
                {comment.user.name}
              </Typography>{" "}
              <Typography
                component="span"
                variant="caption"
                className={classes.date}
              >
                {comment.date}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          {auth.user && auth.user._id === comment.user._id ? (
            <Chip
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleDelete}
              icon={<DeleteIcon />}
            />
          ) : (
            ""
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </List>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

Comment.propTypes = {
  deleteComment: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentsList);
