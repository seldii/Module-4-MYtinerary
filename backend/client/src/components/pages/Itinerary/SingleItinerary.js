import React from "react";
import Footer from "../../layout/Footer";
import { withRouter } from "react-router-dom";
import ItineraryCard from "./ItineraryCard";

const SingleItinerary = props => {
  console.log(props);
  return (
    <div>
      <Footer />
    </div>
  );
};

export default withRouter(SingleItinerary);
