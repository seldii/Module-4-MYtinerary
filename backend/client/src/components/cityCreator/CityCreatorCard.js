import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteCity, getCity } from "../../store/actions/cityActions";
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

const CityCreatorCard = ({ city, deleteCity, getCity, displayCity }) => {
  const classes = useStyles();

  function handleDelete() {
    deleteCity(city._id);
  }
  function handleGetCity() {
    getCity(city._id);
    displayCity(city);
  }

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {city.name}
          </Typography>
        </CardContent>
        <IconButton onClick={handleDelete} className={classes.icon}>
          <FontAwesomeIcon icon="trash-alt" />
        </IconButton>
        <IconButton onClick={handleGetCity} className={classes.icon}>
          <FontAwesomeIcon icon="edit" />
        </IconButton>
      </div>
    </Card>
  );
};

CityCreatorCard.propTypes = {
  deleteCity: PropTypes.func.isRequired,
  getCity: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteCity, getCity }
)(CityCreatorCard);
