import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core/";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileCard from "./ProfileCard";
import { loadUser } from "../../../../store/actions/authActions";
import LogOut from "../../../Auth/LogOut";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    auth: PropTypes.object
  };

  componentDidMount = () => {
    this.props.loadUser();
  };
  render() {
    const { user } = this.props.auth;
    console.log(user);
    return (
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid container justify="center" alignItems="center">
            <ProfileCard user={user}></ProfileCard>
          </Grid>
          <Grid></Grid>
          <Grid container justify="center" alignItems="center">
            <FontAwesomeIcon icon="sign-out-alt" />
            <LogOut></LogOut>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { loadUser }
)(Profile);
