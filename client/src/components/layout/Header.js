import React from "react";
import { Container, Row, Col } from "reactstrap";
import Nav from "./Nav";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";

const useStyles = makeStyles((theme) => ({
  header: {},
}));

const Header = () => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <Container>
        <Row style={{ flexWrap: "nowrap" }}>
          <Col xs style={{ margin: "auto" }}>
            <img
              className="headerImage"
              src="/images/logo_transparent.png"
              alt="header"
            ></img>
          </Col>
          <Col xs style={{ margin: "auto", padding: "0px" }}>
            <Nav />
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
