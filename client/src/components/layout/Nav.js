import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

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
    color: theme.palette.primary.main
  },

  menuIcon: {
    color: theme.palette.secondary.main
  },

  listItemText: {
    color: theme.palette.secondary.light
  }
}));

const TemporaryDrawer = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false
  });

  const { isAuthenticated, user } = props.auth;

  const toggleDrawer = (side, open) => event => {
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div className={classes.list} role="presentation">
      <List>
        <Link to="/cities">
          <ListItem
            button
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
          >
            <ListItemIcon className={classes.menuIcon}>
              <FontAwesomeIcon icon="globe" />
            </ListItemIcon>
            <ListItemText className={classes.listItemText}>Cities</ListItemText>
          </ListItem>
        </Link>
        <Link to="/">
          <ListItem
            button
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
          >
            <ListItemIcon className={classes.menuIcon}>
              <FontAwesomeIcon icon="igloo" />
            </ListItemIcon>
            <ListItemText className={classes.listItemText}>Home</ListItemText>
          </ListItem>
        </Link>
      </List>
      <Divider />
      {isAuthenticated ? (
        <Fragment>
          <Link to={{ pathname: `/profile/${user.name}/favoriteitineraries` }}>
            <ListItem
              button
              onClick={toggleDrawer(side, false)}
              onKeyDown={toggleDrawer(side, false)}
            >
              <ListItemIcon className={classes.menuIcon}>
                <FontAwesomeIcon icon="heart" />
              </ListItemIcon>
              <ListItemText className={classes.listItemText}>
                Itineraries You've Liked
              </ListItemText>
            </ListItem>
          </Link>
          <Link to={{ pathname: `/profile/${user.name}/myitineraries` }}>
            <ListItem
              button
              onClick={toggleDrawer(side, false)}
              onKeyDown={toggleDrawer(side, false)}
            >
              <ListItemIcon className={classes.menuIcon}>
                <FontAwesomeIcon icon="suitcase-rolling" />
              </ListItemIcon>
              <ListItemText className={classes.listItemText}>
                MyItineraries
              </ListItemText>
            </ListItem>
          </Link>

          <List>
            <Link to="/city-creator">
              <ListItem
                button
                onClick={toggleDrawer(side, false)}
                onKeyDown={toggleDrawer(side, false)}
              >
                <ListItemIcon className={classes.menuIcon}>
                  <FontAwesomeIcon icon="map-pin" />
                </ListItemIcon>
                <ListItemText className={classes.listItemText}>
                  Add / Update a City
                </ListItemText>
              </ListItem>
            </Link>
            <Link to="/itinerary-creator">
              <ListItem
                button
                onClick={toggleDrawer(side, false)}
                onKeyDown={toggleDrawer(side, false)}
              >
                <ListItemIcon className={classes.menuIcon}>
                  <FontAwesomeIcon icon="clipboard-list" />
                </ListItemIcon>
                <ListItemText className={classes.listItemText}>
                  Add / Update an Itinerary
                </ListItemText>
              </ListItem>
            </Link>
            <ListItem button>
              <ListItemText>
                {user ? `Welcome ${user.name} !` : ""}
              </ListItemText>
              <ListItemAvatar>
                <Avatar alt={user.name} src={user.image} />
              </ListItemAvatar>
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.menuIcon}>
                <FontAwesomeIcon icon="sign-out-alt" />
              </ListItemIcon>
              <ListItemText className={classes.listItemText}>
                <LogOut />
              </ListItemText>
            </ListItem>
          </List>
        </Fragment>
      ) : (
        <Fragment>
          <ListItem button>
            <ListItemIcon className={classes.menuIcon}>
              <FontAwesomeIcon icon="unlock-alt" />
            </ListItemIcon>
            <ListItemText className={classes.listItemText}>
              <LogInModal toggleDrawer={toggleDrawer(side, false)} />
            </ListItemText>
          </ListItem>
        </Fragment>
      )}
    </div>
  );

  return (
    <div>
      <MenuIcon
        onClick={toggleDrawer("right", true)}
        className={classes.icon}
      />

      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
    </div>
  );
};

TemporaryDrawer.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(TemporaryDrawer);
