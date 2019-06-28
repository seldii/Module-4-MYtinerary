import React from "react";
import logo from "../layout/MYtineraryLogo.png";
import { Container, Row, Col } from "reactstrap";
import { FaArrowCircleRight as Arrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "../layout/Slider";

function Landing() {
  return (
    <React.Fragment>
      <Container style={{ padding: "0px" }}>
        <Row>
          <Col xs="12">
            <img style={{ maxWidth: "100%" }} src={logo} alt="logo" />
          </Col>
          <Col xs="12">
            <p
              style={{
                fontSize: "17px",
                fontWeight: "bold",

                textAlign: "center"
              }}
            >
              Find your perfect trip, designed by insiders who know and love
              their cities{" "}
            </p>
          </Col>

          <Col xs={{ size: 4, offset: 4 }} style={{ textAlign: "center" }}>
            <Link to="/cities">
              <Arrow
                size={56}
                style={{ margin: "auto", display: "inline-block" }}
              />
            </Link>
          </Col>
          <Row style={{ padding: "5px" }} />
        </Row>
      </Container>
      <Slider />
    </React.Fragment>
  );
}
export default Landing;
