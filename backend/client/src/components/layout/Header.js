import React from "react";

import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { FaBars, FaUser } from "react-icons/fa";

function Header() {
  return (
    <header className="App-header">
      <Container>
        <Row style={{ flexWrap: "nowrap" }}>
          <Col xs>
            <Link to="/profile">
              <FaUser style={{ color: "#FF6347", float: "left" }} size={48} />
            </Link>
          </Col>
          <Col xs>
            <Link to="/">
              <FaBars style={{ color: "#FF6347", float: "right" }} size={48} />
            </Link>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
