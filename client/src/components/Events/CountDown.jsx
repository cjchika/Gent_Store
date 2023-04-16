import React, { useEffect, useState } from "react";

const CountDown = ({ item }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(item?.finishDate) - +new Date(); //item.Finish_Date
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Day: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hr: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Min: Math.floor((difference / 1000 / 60) % 60),
        Sec: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="text-base font-medium text-white">
        {timeLeft[interval]}
        {interval}{" "}
      </span>
    );
  });

  return (
    <div className="bg-priColor  absolute p-2 px-4 rounded-lg">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-white text-base">Promo Closed</span>
      )}
    </div>
  );
};

export default CountDown;
