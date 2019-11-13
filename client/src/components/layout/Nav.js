import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Drawer,
  Divider
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogInModal from "../Auth/LogInModal";
import { getItineraries } from "../../store/actions/itineraryAction";

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

const TemporaryDrawer = () => {
  const classes = useStyles();
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    right: false
  });
  let picture;
  const { isAuthenticated, user } = auth;
  if (user) {
    user.image ? (picture = user.image) : (picture = "/" + user.profileImage);
  }

  const toggleDrawer = (side, open) => event => {
    setState({ ...state, [side]: open });
  };
  const sideList = side => (
    <div className={classes.list} role="presentation">
      <List>
        <NavLink to="/cities" exact>
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
        </NavLink>
        <NavLink to="/" exact>
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
        </NavLink>
      </List>
      <Divider />
      {isAuthenticated ? (
        <Fragment>
          <NavLink to={{ pathname: `/${user.name}/favoriteitineraries` }}>
            <ListItem
              button
              onClick={toggleDrawer(side, false)}
              onKeyDown={toggleDrawer(side, false)}
            >
              <ListItemIcon className={classes.menuIcon}>
                <FontAwesomeIcon icon="heart" />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                onClick={() => dispatch(getItineraries())}
              >
                Itineraries You've Liked
              </ListItemText>
            </ListItem>
          </NavLink>
          <NavLink to={{ pathname: `/${user.name}/myitineraries` }}>
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
          </NavLink>

          <List>
            <NavLink to="/city-creator">
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
            </NavLink>
            <NavLink to="/itinerary-creator">
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
            </NavLink>
            <ListItem button>
              <ListItemText>
                {user ? `Welcome ${user.name} !` : ""}
              </ListItemText>
              <ListItemAvatar>
                <Avatar alt={user.name} src={picture} />
              </ListItemAvatar>
            </ListItem>
            <NavLink to="/profile">
              <ListItem
                button
                onClick={toggleDrawer(side, false)}
                onKeyDown={toggleDrawer(side, false)}
              >
                <ListItemIcon className={classes.menuIcon}>
                  <FontAwesomeIcon icon="user-alt" />
                </ListItemIcon>
                <ListItemText className={classes.listItemText}>
                  Profile
                </ListItemText>
              </ListItem>
            </NavLink>
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

export default TemporaryDrawer;
