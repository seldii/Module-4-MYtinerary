import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { amber } from "@material-ui/core/colors";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles(theme => ({
  snackbar: {
    margin: theme.spacing(1),
    backgroundColor: amber[700]
  }
}));

const ErrorMessage = props => {
  const classes = useStyles();
  console.log(props.errors);
  return props.errors.map(err => (
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
  errors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  errors: state.error.errors
});

export default connect(mapStateToProps)(ErrorMessage);
