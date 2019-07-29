import React, { Component } from "react";
import { loadUser } from "../src/store/actions/authActions";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch
} from "react-router-dom";
import Header from "./components/layout/Header";
import "./App.css";
import Landing from "./components/pages/Landing";
import { Container } from "reactstrap";
import Cities from "./components/pages/Cities";
import City from "./components/pages/City";
import CityCreator from "./components/cityCreator/CityCreator";
import CreateItinerary from "./components/pages/Itinerary/CreateItinerary";
import RegistrationPage from "./components/Auth/RegistrationPage";
import MyItineraries from "./components/pages/userProfile/MyItineraries";
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

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container>
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
            </Switch>
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default withRouter(App);
