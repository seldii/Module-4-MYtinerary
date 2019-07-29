import React, { Component } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../../store/actions/authActions";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import ItineraryCard from "../../pages/Itinerary/ItineraryCard";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Footer from "../../layout/Footer";
import { Container, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import notfound from "../../layout/notfound.png";

const styles = theme => ({
  notfound: {
    color: theme.palette.secondary.main,
    textAlign: "center"
  }
});
export class MyItineraries extends Component {
  componentDidMount() {
    this.props.loadUser();
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
    let notFoundText;
    console.log(this.props.auth.user.favorites);

    itineraryList = this.props.auth.user.favorites.map(i => {
      return <ItineraryCard key={i._id} itinerary={i} />;
    });

    notFoundText = (
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
              You've not favorited any itinerary yet
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <img style={{ maxWidth: "100%" }} src={notfound} alt="not found" />
        </Grid>
        <Grid item xs={12}>
          <Link to="/itinerary-creator">
            <Typography className={classes.notfound}>
              You might've not found your favorite itinerary yet, then{" "}
              <span style={{ textDecoration: "underline" }}>
                create your own?
              </span>
            </Typography>
          </Link>
        </Grid>
      </Container>
    );

    return (
      <React.Fragment>
        <Divider />
        {this.props.auth.user.favorites.length ? itineraryList : notFoundText}
        <Footer />
      </React.Fragment>
    );
  }
}

MyItineraries.propTypes = {
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { loadUser }
  )(withStyles(styles, { withTheme: true })(MyItineraries))
);
