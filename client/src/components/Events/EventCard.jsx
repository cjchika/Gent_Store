import React from "react";
import { baseUrl } from "../../config/api";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { currencyFormatter } from "../utils/currencyFormatter";

const EventCard = ({ active, item }) => {
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-10"
      } lg:flex p-2`}
    >
      <CountDown item={item} />
      <div className="w-full lg:-w[50%] m-auto mb-7 md:mb-0 ">
        <img className="mx-auto" src={`${baseUrl}${item?.images[0]}`} alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center lg:pr-3">
        <h2
          className={`${styles.productTitle} capitalize mb-3 text-deepSecColor`}
        >
          {item?.name}
        </h2>
        <p className="text-justify mb-5 text-secColor text-opacity-80">
          {item?.description}
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {currencyFormatter(item?.originalPrice)}
            </h5>
            <h5 className="font-bold text-[20px] text-priColor text-2xl font-Roboto">
              {currencyFormatter(item?.discountPrice)}
            </h5>
          </div>
          <span className="pr-3 font-semibold text-lg text-priColor">
            {item?.sold_out} sold
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
