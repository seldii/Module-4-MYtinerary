import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ErrorMessage from "../common/ErrorMessage";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/authErrActions";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { Container } from "@material-ui/core";

const styles = theme => ({
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
      match: null,
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
    this.setState({ password: value });
  }

  // handle storing the
  // confirmed password in state
  handleConfirmedPassword(e) {
    const { value } = e.target;
    if (value === this.state.password) {
      this.setState({ confirm: value, msg: "Password matches", match: true });
    } else if (value === "") {
      this.setState({ msg: null });
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
    return (
      <Container>
        <div style={{ width: "100%" }} onClick={this.toggle}>
          Sign Up
        </div>
        <Dialog
          fullScreen
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
            <form onSubmit={this.onSubmit} className={this.props.classes.form}>
              <TextField
                autoFocus
                margin="dense"
                type="name"
                name="name"
                label="Name"
                id="name"
                className="mb-3"
                onChange={this.onChange}
                fullWidth
              />
              <TextField
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
                placeholder="Must contain at least 8 characters"
                className="mb-3"
                onChange={this.handleNewPassword}
                fullWidth
              />
              <TextField
                error={this.state.match ? false : true}
                margin="dense"
                type="password"
                name="confirm"
                id="password2"
                label={this.state.msg ? this.state.msg : "Confirm"}
                placeholder="Reenter the password above"
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

              <DialogActions>
                <Button
                  type="submit"
                  variant="contained"
                  className={this.props.classes.button}
                >
                  Sign Up
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Container>
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
