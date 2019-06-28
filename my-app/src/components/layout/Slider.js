import React, { Component } from "react";
import Slider from "react-slick";
import Barcelona from "../pages/Barcelona.png";
import NewYork from "../pages/NewYork.png";
import Amsterdam from "../pages/Amsterdam.png";
import Paris from "../pages/Paris.png";

const items = [
  {
    src: Barcelona,
    name: "Barcelona"
  },
  {
    src: NewYork,
    name: "New York"
  },
  {
    src: Amsterdam,
    name: "Amsterdam"
  },
  {
    src: Paris,
    name: "Paris"
  },
  {
    src: Barcelona,
    name: "Barcelona"
  },
  {
    src: NewYork,
    name: "New York"
  },
  {
    src: Amsterdam,
    name: "Amsterdam"
  },
  {
    src: Paris,
    name: "Paris"
  },
  {
    src: Barcelona,
    name: "Barcelona"
  },
  {
    src: NewYork,
    name: "New York"
  },
  {
    src: Amsterdam,
    name: "Amsterdam"
  },
  {
    src: Paris,
    name: "Paris"
  },
  {
    src: Barcelona,
    name: "Barcelona"
  },
  {
    src: NewYork,
    name: "New York"
  },
  {
    src: Amsterdam,
    name: "Amsterdam"
  },
  {
    src: Paris,
    name: "Paris"
  }
];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}
export class SlideMe extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      rows: 2,
      slidesPerRow: 2,
      slide: "container",
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <Slider {...settings}>
        {items.map(item => {
          return <img src={item.src} alt={item.name} />;
        })}
      </Slider>
    );
  }
}

export default SlideMe;
