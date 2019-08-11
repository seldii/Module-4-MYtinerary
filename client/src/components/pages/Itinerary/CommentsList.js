import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
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

const CommentsList = ({ comment }) => {
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
      </ListItem>
      <Divider />
    </List>
  );
};

export default CommentsList;
