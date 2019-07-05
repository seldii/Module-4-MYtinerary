import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import "./App.css";
import Landing from "./components/pages/LandingFirst";
import CreateAccount from "./components/pages/CreateAccount";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import { Container } from "reactstrap";
import Cities from "./components/pages/Cities";
import CityCreator from "./components/cityCreator/CityCreator";
import { Provider } from "react-redux";
import store from "./store";
import "typeface-roboto";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faGlobe,
  faMapPin,
  faHeart,
  faSuitcaseRolling,
  faUserAlt,
  faIgloo,
  faBomb
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fab,
  faGlobe,
  faMapPin,
  faHeart,
  faSuitcaseRolling,
  faUserAlt,
  faIgloo,
  faBomb
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route path="/signin" component={CreateAccount} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/cities" component={Cities} />
            <Route path="/city-creator" component={CityCreator} />
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default App;
