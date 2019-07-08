import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteCity } from "../../store/actions/cityActions";
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
    color: "#FF6347"
  }
}));

const CityCreatorCard = ({ name, id, deleteCity }) => {
  const classes = useStyles();
  const theme = useTheme();
  const handleChange = event => deleteCity(id);

  return (
    <Card className={classes.card} key={id}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {name}
          </Typography>
        </CardContent>
        <IconButton onClick={handleChange} className={classes.icon}>
          <FontAwesomeIcon icon="trash-alt" />
        </IconButton>
        <IconButton className={classes.icon}>
          <FontAwesomeIcon icon="edit" />
        </IconButton>
      </div>
    </Card>
  );
};

CityCreatorCard.propTypes = {
  deleteCity: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteCity }
)(CityCreatorCard);
