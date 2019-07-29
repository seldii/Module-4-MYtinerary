import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import HomeIcon from "@material-ui/icons/Home";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    alignSelf: "center",
    backgroundColor: "rgb(238,238,238,0.5)"
  },
  icon: {
    color: theme.palette.secondary.main,
    fontSize: 20
  }
}));

function Footer({ history }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        onClick={history.goBack}
        style={{ paddingTop: 16 }}
        icon={
          <FontAwesomeIcon
            icon="arrow-alt-circle-left"
            className={classes.icon}
          />
        }
      />
      <BottomNavigationAction
        component={Link}
        to={"/"}
        icon={<FontAwesomeIcon icon="igloo" className={classes.icon} />}
      />
      <BottomNavigationAction
        icon={<FontAwesomeIcon icon="user-alt" className={classes.icon} />}
      />
    </BottomNavigation>
  );
}
export default withRouter(Footer);
