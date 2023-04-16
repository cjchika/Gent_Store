import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import eventApi from "../../config/services/event.api";
import Loader from "../Layout/Loader";

const Events = () => {
  const [allEvents, setAllEvents] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const { response, error } = await eventApi.getAllEvents();
      if (response) setAllEvents(response.events);
      if (error) console.log(error.message);
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1 className="text-secColor">Featured Product</h1>
          </div>

          <div className="w-full grid">
            <EventCard item={allEvents?.[0]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
