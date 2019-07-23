import React, { Component } from "react";
import Slider from "react-slick";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

export class ActivitySlider extends Component {
  render() {
    console.log(this.props);
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };

    const styles = {
      media: {},
      card: {
        position: "relative"
      },
      overlay: {
        position: "",
        top: "20px",
        left: "20px",
        color: "black",
        backgroundColor: "white",
        fontSize: "0.5 rem"
      }
    };
    return (
      <Slider {...settings}>
        {this.props.itinerary.activities.map((item, idx) => {
          return (
            <Card key={idx} style={styles.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={item.description}
                  image={item.image}
                  title={item.description}
                  style={styles.media}
                />
              </CardActionArea>
              <div style={styles.overlay}>{item.description}</div>
            </Card>
          );
        })}
      </Slider>
    );
  }
}

export default ActivitySlider;
