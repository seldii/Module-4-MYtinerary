import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/";
import { loadUser } from "../src/store/actions/authActions";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch
} from "react-router-dom";
import Header from "./components/layout/Header";
import Landing from "./components/pages/Landing";
import { Container } from "reactstrap";
import Cities from "./components/pages/Cities";
import City from "./components/pages/City";
import CityCreator from "./components/cityCreator/CityCreator";
import CreateItinerary from "./components/pages/Itinerary/CreateItinerary";
import RegistrationPage from "./components/Auth/RegistrationPage";
import MyItineraries from "./components/pages/userProfile/MyItineraries";
import FavItineraries from "./components/pages/userProfile/FavoriteItineraries";
import { Provider } from "react-redux";
import store from "./store";
import "typeface-roboto";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "typeface-roboto";
import {
  faGlobe,
  faMapPin,
  faHeart,
  faSuitcaseRolling,
  faUserAlt,
  faIgloo,
  faBomb,
  faTrashAlt,
  faEdit,
  faClipboardList,
  faPaperPlane,
  faUnlockAlt,
  faSignOutAlt,
  faArrowAltCircleLeft
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fab,
  faGlobe,
  faMapPin,
  faHeart,
  faSuitcaseRolling,
  faUserAlt,
  faIgloo,
  faBomb,
  faTrashAlt,
  faEdit,
  faClipboardList,
  faPaperPlane,
  faUnlockAlt,
  faSignOutAlt,
  faArrowAltCircleLeft
);

const styles = theme => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      width: "60% !important"
    }
  }
});

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container className={this.props.classes.root}>
            <Header />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/sign-up" component={RegistrationPage} />
              <Route exact path="/cities" component={Cities} />
              <Route
                exact
                path="/cities/:cityName"
                component={withRouter(City)}
              />

              <Route exact path="/city-creator" component={CityCreator} />
              <Route path="/itinerary-creator" component={CreateItinerary} />

              <Route
                exact
                path="/profile/:user/myitineraries"
                component={withRouter(MyItineraries)}
              />
              <Route
                exact
                path="/profile/:user/favoriteitineraries"
                component={withRouter(FavItineraries)}
              />
            </Switch>
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(App));
