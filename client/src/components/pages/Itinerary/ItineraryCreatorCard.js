import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  deleteItinerary,
  getItinerary
} from "../../../store/actions/itineraryAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  card: {
    borderColor: "#FF6347",
    marginBottom: theme.spacing(1),
    fontFamily: "Roboto"
  },
  details: {
    display: "flex",
    flexDirection: "row"
  },
  content: {
    flexGrow: "2"
  },
  icon: {
    color: theme.palette.secondary.light
  }
}));

const ItineraryCreatorCard = ({
  itinerary,
  deleteItinerary,
  getItinerary,
  displayItinerary
}) => {
  const classes = useStyles();

  function handleDelete() {
    deleteItinerary(itinerary._id);
  }
  function handleGetItinerary() {
    getItinerary(itinerary._id);
    displayItinerary(itinerary);
  }

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {itinerary.title}
          </Typography>
        </CardContent>
        <IconButton onClick={handleDelete} className={classes.icon}>
          <FontAwesomeIcon icon="trash-alt" />
        </IconButton>
        <IconButton onClick={handleGetItinerary} className={classes.icon}>
          <FontAwesomeIcon icon="edit" />
        </IconButton>
      </div>
    </Card>
  );
};

ItineraryCreatorCard.propTypes = {
  deleteItinerary: PropTypes.func.isRequired,
  getItinerary: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteItinerary, getItinerary }
)(ItineraryCreatorCard);
