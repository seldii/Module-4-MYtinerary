import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core/";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileCard from "./ProfileCard";
import { loadUser } from "../../../../store/actions/authActions";
import { getItinerariesByUser } from "../../../../store/actions/itineraryAction";
import LogOut from "../../../Auth/LogOut";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    auth: PropTypes.object,
  };

  componentDidMount = () => {
    const { getUser, getItinerariesByUser, auth } = this.props;
    getUser();
    getItinerariesByUser(auth.user?._id);
  };
  render() {
    const {
      auth: { user },
      itinerariesByUser,
    } = this.props;

    return (
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid container justify="center" alignItems="center">
            <ProfileCard
              user={user || ""}
              itineraries={itinerariesByUser}
            ></ProfileCard>
          </Grid>
          <Grid></Grid>
          <Grid container justify="center" alignItems="center">
            <FontAwesomeIcon icon="sign-out-alt" />
            <LogOut />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  itinerariesByUser: state.itineraries.itinerariesByUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getItinerariesByUser: (userId) => {
      dispatch(getItinerariesByUser(userId));
    },

    getUser: () => {
      dispatch(loadUser());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
