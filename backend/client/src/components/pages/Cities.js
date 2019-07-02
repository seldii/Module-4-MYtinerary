import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardTitle,
  CardImg,
  CardImgOverlay
} from "reactstrap";

export class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = { cities: [] };
  }

  componentDidMount() {
    axios
      .get("/cities")
      .then(res => {
        this.setState({ cities: res.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    let cityList;

    if (this.state.cities) {
      cityList = this.state.cities.map(city => {
        return (
          <Card inverse>
            <CardImg width="100%" src={city.image} alt="Card image cap" />
            <CardImgOverlay style={{ display: "flex" }}>
              <CardTitle
                style={{
                  textAlign: "center",
                  width: "100%",
                  alignSelf: "center",
                  backgroundColor: "rgba(255,255,255,0.5)",
                  marginBottom: "0px"
                }}
              >
                {city.name}
              </CardTitle>
            </CardImgOverlay>
          </Card>
        );
      });
    } else {
      cityList = <div>Loading..</div>;
    }
    return <Container style={{ marginTop: "15px" }}>{cityList}</Container>;
  }
}

export default Cities;
