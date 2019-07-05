import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorMessage = ({ error }) => {
  return (
    <List style={{ color: "#FF6347" }}>
      {error.map(err => (
        <ListItem key={err.id}>
          <ListItemIcon>
            <FontAwesomeIcon style={{ color: "#FF6347" }} icon="bomb" />
          </ListItemIcon>
          <ListItemText>{err.text}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps)(ErrorMessage);
