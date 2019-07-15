import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogOut from "../Auth/LogOut";
import LogInModal from "../Auth/LogInModal";

const useStyles = makeStyles(theme => ({
  list: {
    width: "auto"
  },

  icon: {
    margin: "auto",
    float: "right",
    fontSize: "3rem",
    color: "#FF6347"
  }
}));

const iconStyle = () => {
  return {
    minWidth: "10px",
    paddingRight: "2px",
    color: "#FF6347"
  };
};

const TemporaryDrawer = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false
  });

  const { isAuthenticated, user } = props.auth;

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Link to="/cities">
          <ListItem button>
            <ListItemIcon style={iconStyle()}>
              <FontAwesomeIcon icon="globe" />
            </ListItemIcon>
            <ListItemText>Cities</ListItemText>
          </ListItem>
        </Link>
        <Link to="">
          <ListItem button>
            <ListItemIcon style={iconStyle()}>
              <FontAwesomeIcon icon="heart" />
            </ListItemIcon>
            <ListItemText>Cities You Loved</ListItemText>
          </ListItem>
        </Link>
        <Link to="/cities">
          <ListItem button>
            <ListItemIcon style={iconStyle()}>
              <FontAwesomeIcon icon="suitcase-rolling" />
            </ListItemIcon>
            <ListItemText>Your Itineraries</ListItemText>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/city-creator">
          <ListItem button>
            <ListItemIcon style={iconStyle()}>
              <FontAwesomeIcon icon="map-pin" />
            </ListItemIcon>
            <ListItemText>City Creator</ListItemText>
          </ListItem>
        </Link>
        <Link to="/itinerary-creator">
          <ListItem button>
            <ListItemIcon style={iconStyle()}>
              <FontAwesomeIcon icon="clipboard-list" />
            </ListItemIcon>
            <ListItemText>Itinerary Creator</ListItemText>
          </ListItem>
        </Link>
        <Link to="/">
          <ListItem button>
            <ListItemIcon style={iconStyle()}>
              <FontAwesomeIcon icon="igloo" />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
        </Link>
        {!isAuthenticated ? (
          <LogInModal style={{ zIndex: "999" }} />
        ) : (
          <Fragment>
            <ListItem button>{user ? `Welcome ${user.name} !` : ""}</ListItem>
            <ListItem button>
              <LogOut />
            </ListItem>
          </Fragment>
        )}

        {!isAuthenticated ? (
          <Link to="/sign-in">
            <ListItem button>
              <ListItemText>Register</ListItemText>
            </ListItem>
          </Link>
        ) : null}
      </List>
    </div>
  );

  return (
    <div>
      <MenuIcon
        onClick={toggleDrawer("right", true)}
        className={classes.icon}
      />

      <Drawer
        style={{ zIndex: "1" }}
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(TemporaryDrawer);
