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

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route path="/signin" component={CreateAccount} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/cities" component={Cities} />
        </Container>
      </Router>
    );
  }
}

export default App;
