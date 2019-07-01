import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

export default function Footer() {
  return (
    <footer>
      <Container style={{ alignItems: "center" }}>
        <Row style={{ alignItems: "center" }}>
          <Col xs={{ size: 4, offset: 4 }} style={{ textAlign: "center" }}>
            <Link style={{ margin: "auto", display: "inline-block" }}>
              <FaHome style={{ color: "#FF6347" }} size={56} />
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
