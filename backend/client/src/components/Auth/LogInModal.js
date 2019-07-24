import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/authErrActions";

class LogInModal extends Component {
  state = {
    open: false,
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "LOGIN_FAIL") {
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    // Attempt to login
    this.props.login(user);
  };

  render() {
    return (
      <Fragment>
        <Button onClick={this.toggle}>Log in</Button>

        <Dialog
          open={this.state.open}
          onClose={this.toggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            {this.state.msg ? (
              <p style={{ color: "red" }}>{this.state.msg}</p>
            ) : (
              <DialogContentText>
                Please enter your login details
              </DialogContentText>
            )}

            <form onSubmit={this.onSubmit}>
              <TextField
                autoFocus
                margin="dense"
                type="email"
                name="email"
                label="Email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={this.onChange}
                fullWidth
              />

              <TextField
                type="password"
                name="password"
                id="password"
                lanel="Password"
                placeholder="Password"
                className="mb-3"
                onChange={this.onChange}
                fullWidth
              />
              <DialogActions>
                <Button
                  type="submit"
                  value="Submit"
                  style={{ marginTop: "2rem" }}
                  onClick={this.props.toggleDrawer}
                >
                  Login
                </Button>
              </DialogActions>
            </form>
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
  { login, clearErrors }
)(LogInModal);
