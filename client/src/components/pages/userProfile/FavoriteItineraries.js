import React, { Component } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../../store/actions/authActions";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import ItineraryCard from "../../pages/Itinerary/ItineraryCard";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Footer from "../../layout/Footer";
import { Container, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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

    if (this.props.auth.user.favorites.length) {
      itineraryList = this.props.auth.user.favorites.map(i => {
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
              <Typography variant="body2" className={classes.notfound}>
                You've not favorited any itinerary yet
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
              <Typography variant="body2" className={classes.notfound}>
                You might've not found your favorite itinerary yet, then{" "}
                <span style={{ textDecoration: "underline" }}>
                  create your own?
                </span>
              </Typography>
            </Link>
          </Grid>
        </Container>
      );
    }

    return (
      <React.Fragment>
        <Divider />
        {itineraryList}
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