import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

export class LogOut extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };
  handleOnClick = async () => {
    await this.props.history.push("/");
    this.props.logout();
  };
  render() {
    return (
      <Fragment>
        <div onClick={this.handleOnClick}>Logout</div>
      </Fragment>
    );
  }
}

export default withRouter(
  connect(
    null,
    { logout }
  )(LogOut)
);
