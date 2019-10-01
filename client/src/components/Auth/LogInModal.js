import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import RegistrationPage from "../Auth/RegistrationPage";

const styles = theme => ({
  root: {},
  link: {
    color: theme.palette.secondary.main
  },
  button: {
    color: theme.palette.secondary.main,
    marginTop: theme.spacing(2)
  }
});

class LogInModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      email: "",
      password: "",
      msg: null
    };

    this.handleClose = this.handleClose.bind(this);
  }

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
    const { isAuthenticated } = this.props;
    if (!this.state.open) {
      this.setState({
        open: !this.state.open
      });
    } else {
      if (isAuthenticated) {
        // Clear errors
        this.props.clearErrors();
        this.setState({
          open: !this.state.open
        });
        if (this.props.toggleDrawer) {
          this.props.toggleDrawer();
        }
      }
    }
  };

  handleClose = () => {
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
    const fullScreenBool =
      window.screen.availWidth < this.props.theme.breakpoints.values.sm;
    return (
      <React.Fragment>
        <span style={{ width: "100%", padding: 0 }} onClick={this.toggle}>
          Log in
        </span>
        <Dialog
          fullScreen={fullScreenBool}
          className={this.props.classes.root}
          open={this.state.open}
          onClose={this.toggle}
          aria-labelledby="form-dialog-title"
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={this.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" style={{}}>
              Login
            </Typography>
          </Toolbar>
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
                  variant="contained"
                  type="submit"
                  value="Submit"
                  className={this.props.classes.button}
                  onClick={this.props.toggle}
                >
                  Login
                </Button>
              </DialogActions>
              <Grid container>
                <Grid item xs>
                  <Link
                    to="#"
                    variant="body2"
                    className={this.props.classes.link}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    to="/sign-up"
                    component={RegistrationPage}
                    variant="body2"
                    className={this.props.classes.link}
                    onClick={this.handleClose}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(withStyles(styles, { withTheme: true })(LogInModal));
