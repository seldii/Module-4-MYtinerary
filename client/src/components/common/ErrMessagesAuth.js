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

const ErrMessagesAuth = props => {
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

ErrMessagesAuth.propTypes = {
  errors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  errors: state.error
});

export default connect(mapStateToProps)(ErrMessagesAuth);
