import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItinerariesByUser } from "../../../../store/actions/itineraryAction";
import { withRouter } from "react-router-dom";
import ItineraryCard from "../../Itinerary/ItineraryCard";
import { Divider } from "@material-ui/core/";
import Footer from "../../../layout/Footer";
import NotFoundPage from "./NotFoundPage";

const MyItineraries = props => {
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector(state => state.auth.user._id);
  const itinerariesByUser = useSelector(
    state => state.itineraries.itinerariesByUser
  );
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const iti = async () => {
        await dispatch(getItinerariesByUser(userId));
        await setIsLoading(false);
      };
      iti();
    } catch (err) {
      console.log(err);
    }
  }, [itinerariesByUser]);

  let itineraryList;
  if (isLoading) {
    itineraryList = <div>Loading..</div>;
  } else {
    if (itinerariesByUser.length) {
      itineraryList = itinerariesByUser.map(i => {
        return <ItineraryCard key={i._id} itinerary={i} />;
      });
    } else {
      itineraryList = <NotFoundPage />;
    }
  }

  return (
    <React.Fragment>
      <Divider variant="middle" />
      {itineraryList}
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(MyItineraries);
