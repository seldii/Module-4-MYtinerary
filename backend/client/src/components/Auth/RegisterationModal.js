import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
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
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { Container } from "@material-ui/core";

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
      <Container>
        <div style={{ width: "100%" }} onClick={this.toggle}>
          Register
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
            {this.state.msg ? (
              <p style={{ color: "red" }}>{this.state.msg}</p>
            ) : (
              <DialogContentText>
                Please enter your registeration details
              </DialogContentText>
            )}

            <form onSubmit={this.onSubmit} className={this.props.classes.form}>
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
