import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { productData } from "../../static/data";

const Events = () => {
  const [allEvents, setAllEvents] = useState(productData[0]);
  // const { allEvents } = useSelector((state) => state.events);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1 className="text-secColor">Featured Product</h1>
          </div>

          <div className="w-full grid">
            <EventCard item={allEvents} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
