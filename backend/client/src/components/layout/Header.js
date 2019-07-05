import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Nav from "./Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
  return (
    <header className="App-header">
      <Container>
        <Row style={{ flexWrap: "nowrap" }}>
          <Col xs style={{ margin: "auto" }}>
            <Link to="/profile">
              <FontAwesomeIcon
                style={{
                  float: "left",
                  fontSize: "2em",
                  color: "#FF6347",
                  textAlign: "center"
                }}
                icon="user-alt"
              />
            </Link>
          </Col>
          <Col xs style={{ margin: "auto", padding: "0px" }}>
            <Nav />
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
