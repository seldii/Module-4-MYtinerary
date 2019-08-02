import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/authErrActions";
import Footer from "../layout/Footer";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LogInModal from "./LogInModal";

class RegisterPage extends Component {
  state = {
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
    const { error } = this.props;
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
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {this.state.msg ? (
          <Typography style={{ color: "red" }}>{this.state.msg}</Typography>
        ) : (
          <Typography>Please enter your registeration details</Typography>
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
            autoFocus
            margin="dense"
            type="password"
            name="password"
            id="password"
            label="Password"
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
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="#" variant="body2">
                Already have an account? <LogInModal />
              </Link>
            </Grid>
          </Grid>
        </form>

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
