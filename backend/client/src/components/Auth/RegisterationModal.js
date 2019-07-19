import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/authErrActions";
import Footer from "../layout/Footer";

class RegisterPage extends Component {
  state = {
    open: false,
    name: "",
    email: "",
    image: "",
    password: "",
    msg: null
  };

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

    const { name, email, image, password } = this.state;

    const newUser = {
      name,
      email,
      image,
      password
    };

    //Attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggle}>Register</Button>
        <Dialog
          open={this.state.open}
          onClose={this.toggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Sign in</DialogTitle>
          <DialogContent>
            {this.state.msg ? (
              <p style={{ color: "red" }}>{this.state.msg}</p>
            ) : (
              <DialogContentText>
                Please enter your registeration details
              </DialogContentText>
            )}

            <form onSubmit={this.onSubmit}>
              <TextField
                autoFocus
                margin="dense"
                type="name"
                name="name"
                label="Name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={this.onChange}
                fullWidth
              />
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
              <TextField
                type="url"
                name="image"
                id="image"
                label="Image"
                placeholder="Please enter a valid url"
                className="mb-3"
                onChange={this.onChange}
                fullWidth
              />

              <DialogActions>
                <Button
                  type="submit"
                  value="Submit"
                  style={{ marginTop: "2rem" }}
                >
                  Register
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
        <Footer />
      </div>
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
)(RegisterPage);
