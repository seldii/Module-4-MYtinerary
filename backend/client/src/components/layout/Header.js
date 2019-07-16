import React from "react";
import { Container, Row, Col } from "reactstrap";
import Nav from "./Nav";

function Header() {
  return (
    <header className="App-header">
      <Container>
        <Row style={{ flexWrap: "nowrap" }}>
          <Col xs style={{ margin: "auto" }} />
          <Col xs style={{ margin: "auto", padding: "0px" }}>
            <Nav />
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
