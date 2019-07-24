import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { amber, green } from "@material-ui/core/colors";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles(theme => ({
  snackbar: {
    margin: theme.spacing(1),
    backgroundColor: amber[700]
  }
}));

const ErrorMessage = ({ error }) => {
  const classes = useStyles();

  return error.map(err => (
    <SnackbarContent
      key={err.id}
      className={classes.snackbar}
      message={
        <span className={classes.message}>
          <WarningIcon />
          {err.text}
        </span>
      }
    />
  ));
};

ErrorMessage.propTypes = {
  error: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps)(ErrorMessage);
