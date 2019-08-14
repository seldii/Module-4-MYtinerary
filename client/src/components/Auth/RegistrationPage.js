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
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      email: "",
      image: "",
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

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, image } = this.state;
    const password = this.state.password.newPassword;

    const newUser = {
      name,
      email,
      image,
      password
    };

    //Attempt to register
    this.handlePasswordMatch().then(({ success }) => {
      if (success) {
        this.props.register(newUser);
      }
    });
  };

  // handle storing the
  // new password in state
  handleNewPassword(e) {
    let value = e.target.value;
    let passwordObj = Object.assign({}, this.state.password);
    passwordObj.newPassword = value;
    this.setState({ password: passwordObj });
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
    let { password } = this.state;
    let passwordObj = Object.assign({}, this.state.password);
    if (password.newPassword === password.confirmed) {
      passwordObj.match = true;
    } else {
      passwordObj.msg = "Password did not match";
      passwordObj.match = false;
    }
    await this.setState({ password: passwordObj });
    return {
      success: this.state.password.match
    };
  }

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
            type="text"
            name="name"
            label="Name"
            id="name"
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
            className="mb-3"
            onChange={this.onChange}
            fullWidth
          />

          <TextField
            margin="dense"
            type="password"
            name="password"
            id="password"
            label="Password"
            placeholder="Must be at least 8 character long"
            className="mb-3"
            onChange={this.handleNewPassword}
            fullWidth
          />
          <TextField
            error={!this.state.match}
            margin="dense"
            type="password"
            name="confirm"
            id="password2"
            label="Confirm"
            placeholder="Reenter the password above"
            helperText={this.state.msg ? this.state.msg : ""}
            className="mb-3"
            onChange={this.handleConfirmedPassword}
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
