import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./App.css";
import Landing from "./components/pages/Landing";
import Login from "./components/pages/Login";
import { Container } from "reactstrap";

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Footer />
        </Container>
      </Router>
    );
  }
}

export default App;
