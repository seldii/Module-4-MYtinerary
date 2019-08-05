import React, { Component } from "react";
import { connect } from "react-redux";
import { getItinerariesByUser } from "../../../store/actions/itineraryAction";
import { loadUser } from "../../../store/actions/authActions";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import ItineraryCard from "../../pages/Itinerary/ItineraryCard";
import { Typography, Container, Divider, Grid } from "@material-ui/core/";
import Footer from "../../layout/Footer";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  notfound: {
    color: theme.palette.secondary.main,
    textAlign: "center"
  },
  link: {
    color: theme.palette.secondary.main,
    textAlign: "center",
    textDecoration: "underline"
  }
});

export class MyItineraries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    const userName = this.props.auth.user.name;
    this.props.getItinerariesByUser(userName);
  }

  /* componentWillReceiveProps(nextProps) {
    console.log(this.props.match);
    console.log(nextProps);

    if (this.props.match.params !== nextProps.match.params) {
      this.props.getItinerariesByUser(nextProps.match.params);
    }
  } */

  render() {
    const classes = this.props.classes;
    let itineraryList;

    if (this.props.itinerariesByUser.length) {
      itineraryList = this.props.itinerariesByUser.map(i => {
        return <ItineraryCard key={i._id} itinerary={i} />;
      });
    } else {
      itineraryList = (
        <Container
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            /* bring your own prefixes */
            transform: `translate(${-50}%, ${-50}%)`
          }}
        >
          <Grid container direction="column">
            <Grid item xs={12}>
              <Typography className={classes.notfound}>
                You've not created any itinerary yet
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <img
              style={{ maxWidth: "100%" }}
              src="/images/notfound.png"
              alt="not found"
            />
          </Grid>
          <Grid item xs={12}>
            <Link to="/itinerary-creator">
              <Typography className={classes.link}>
                Are you ready to create your own itinerary?
              </Typography>
            </Link>
          </Grid>
        </Container>
      );
    }
    return (
      <React.Fragment>
        <Divider variant="middle" />
        {itineraryList}
        <Footer />
      </React.Fragment>
    );
  }
}

MyItineraries.propTypes = {
  getItinerariesByUser: PropTypes.func.isRequired,
  itinerariesByUser: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  itinerariesByUser: state.itineraries.itinerariesByUser,
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { getItinerariesByUser, loadUser }
  )(withStyles(styles, { withTheme: true })(MyItineraries))
);
