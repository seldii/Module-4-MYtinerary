import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/authErrActions";
import Footer from "../layout/Footer";

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
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (isAuthenticated) {
      this.toggle();
    }
  }

  toggle = () => {};

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
    console.log(newUser);
    //Attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="mb-3"
              onChange={this.onChange}
            />

            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="mb-3"
              onChange={this.onChange}
            />
            <Label for="image">Profile Picture</Label>
            <Input
              type="url"
              name="image"
              id="image"
              placeholder="Please enter an URL"
              className="mb-3"
              onChange={this.onChange}
            />
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="mb-3"
              onChange={this.onChange}
            />
            <Button color="dark" style={{ marginTop: "2rem" }} block>
              Register
            </Button>
          </FormGroup>
        </Form>
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
