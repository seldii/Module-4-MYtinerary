import React from "react";

import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { FaBars, FaUser } from "react-icons/fa";

function Header() {
  return (
    <header className="App-header">
      <Container>
        <Row>
          <Col xs={{ size: 2 }}>
            <Link to="/login">
              <FaUser style={{ color: "#FF6347" }} size={48} />
            </Link>
          </Col>
          <Col xs={{ size: 2, offset: 7 }}>
            <Link to="/">
              <FaBars style={{ color: "#FF6347" }} size={48} />
            </Link>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
