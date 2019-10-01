import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Toolbar
} from "@material-ui/core";
import ErrorMessage from "../common/ErrorMessage";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/authErrActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { Container } from "@material-ui/core";
import RegisterationForm from "./RegisterationForm";

const styles = theme => ({
  toolbar: {
    marginTop: "2rem"
  }
});

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      email: "",
      profileImage: null,
      password: null,
      confirm: null,
      match: "empty",
      msg: null
    };
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handlePasswordMatch = this.handlePasswordMatch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleConfirmedPassword = this.handleConfirmedPassword.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    // If authenticated, close modal
    if (this.state.open) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      open: !this.state.open
    });
  };
  fileSelectedHandler = e => {
    this.setState({ profileImage: e.target.files[0] });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, profileImage } = this.state;

    const formData = new FormData();
    formData.append("profileImage", profileImage);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    console.log(formData);

    //Attempt to register
    this.handlePasswordMatch().then(({ success }) => {
      if (success) {
        this.props.register(formData);
      }
    });
  };

  // handle storing the
  // new password in state
  handleNewPassword(e) {
    let value = e.target.value;
    this.setState({ password: value });
  }

  // handle storing the
  // confirmed password in state
  handleConfirmedPassword(e) {
    const { value } = e.target;
    if (value === this.state.password) {
      this.setState({ confirm: value, msg: "", match: true });
    } else if (value != this.state.password && value != "") {
      this.setState({ msg: "Password doesn't match", match: false });
    } else if (value === "") {
      this.setState({ msg: null, match: "empty" });
    }
  }

  async handlePasswordMatch() {
    let { password, confirm, match, msg } = this.state;

    if (password === confirm) {
      match = true;
    } else {
      match = false;
      msg = "Password did not match";
    }
    await this.setState({ match, msg });
    return {
      success: this.state.match
    };
  }

  render() {
    const isFullScreen =
      window.screen.availWidth < this.props.theme.breakpoints.values.sm;
    return (
      <Fragment>
        <span style={{ width: "100%", padding: 0 }} onClick={this.toggle}>
          Create an Account
        </span>
        <Dialog
          fullScreen={isFullScreen}
          open={this.state.open}
          onClose={this.toggle}
          aria-labelledby="form-dialog-title"
        >
          <Toolbar className={this.props.classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={this.toggle}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" style={{}}>
              Sign Up
            </Typography>
          </Toolbar>
          <DialogContent>
            <ErrorMessage />
            <RegisterationForm
              msg={this.state.msg}
              match={this.state.match}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              handleNewPassword={this.handleNewPassword}
              handleConfirmedPassword={this.handleConfirmedPassword}
              fileSelectedHandler={this.fileSelectedHandler}
            />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errorAuth
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(withStyles(styles, { withTheme: true })(RegisterPage));
