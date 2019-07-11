import React, { Component } from "react";
import Slider from "react-slick";

import "../../App.css";

const items = [
  {
    src:
      "https://i1.wp.com/www.roadtripsaroundtheworld.com/wp-content/uploads/2016/03/Berlin-Walking-tour-map-Visit-roadtripsaroundtheworld.com-to-learn-more.jpg?w=1500&ssl=1"
  },
  {
    src:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-540x360/06/71/e2/1b.jpg"
  },
  { src: "https://cdn.getyourguide.com/img/tour_img-301489-148.jpg" }
];

export class SlideMe extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      rows: 1,
      slidesPerRow: 3,
      slide: "container"
    };
    return (
      <Slider {...settings}>
        {items.map(item => {
          return <img style={{ height: "20px" }} src={item.src} alt="" />;
        })}
      </Slider>
    );
  }
}

export default SlideMe;
