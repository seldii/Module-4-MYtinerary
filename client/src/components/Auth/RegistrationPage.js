import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/authErrActions";
import Footer from "../layout/Footer";
import Typography from "@material-ui/core/Typography";
import ErrorMessage from "../common/ErrorMessage";
import RegisterationForm from "./RegisterationForm";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: null,
      email: null,
      file: null,
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
    this.setState({ file: e.target.files[0] });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, file } = this.state;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

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
    } else if (value !== this.state.password && value !== "") {
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
        <RegisterationForm
          msg={this.state.msg}
          match={this.state.match}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          handleNewPassword={this.handleNewPassword}
          handleConfirmedPassword={this.handleConfirmedPassword}
          fileSelectedHandler={this.fileSelectedHandler}
        />

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errorAuth
});

export default connect(mapStateToProps, { register, clearErrors })(
  withStyles({ withTheme: true })(RegisterPage)
);
