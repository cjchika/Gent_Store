import React from "react";
import { useSelector } from "react-redux";

const EventsPage = () => {
  // const { allEvents, isLoading } = useSelector((state) => state.events);
  return <>{isLoading ? <p>Loading</p> : <div>Hey</div>}</>;
};

export default EventsPage;
