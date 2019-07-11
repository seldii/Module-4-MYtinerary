import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import HomeIcon from "@material-ui/icons/Home";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    alignSelf: "center"
  },
  icon: {
    color: "#FF6347"
  }
});

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
        icon={<ArrowLeftIcon className={classes.icon} />}
      />
      <BottomNavigationAction
        component={Link}
        to={"/"}
        icon={<HomeIcon className={classes.icon} />}
      />
      <BottomNavigationAction
        icon={<LocationOnIcon className={classes.icon} />}
      />
    </BottomNavigation>
  );
}
export default withRouter(Footer);
