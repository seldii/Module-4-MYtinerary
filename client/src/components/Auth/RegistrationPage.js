import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
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
import ErrorMessage from "../common/ErrorMessage";

const styles = theme => ({
  link: {
    color: theme.palette.secondary.main
  },
  button: {
    color: theme.palette.secondary.main,
    marginTop: theme.spacing(2)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "1rem"
  },
  toolbar: {
    marginTop: "2rem"
  }
});

class RegisterPage extends Component {
  state = {
    name: "",
    email: "",
    image: "",
    password: ""
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();

    const { name, email, image, password } = this.state;

    const newUser = {
      name,
      email,
      image,
      password
    };

    //Attempt to register
    await this.props.register(newUser);
    if (this.props.isAuthenticated) {
      await this.props.history.push("/");
    }
  };

  render() {
    return (
      <div>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <ErrorMessage />
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={this.props.classes.button}
          >
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
)(withStyles(styles, { withTheme: true })(RegisterPage));
