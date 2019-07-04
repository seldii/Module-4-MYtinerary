import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import { maxWidth } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },

  icon: {
    margin: theme.spacing(0),
    float: "right",
    fontSize: "3em",
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

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false
  });

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
      onClick={toggleDrawer(side, false)}
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
        <Link to="/">
          <ListItem button>
            <ListItemIcon style={iconStyle()}>
              <FontAwesomeIcon icon="igloo" />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
        </Link>
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
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
    </div>
  );
}
