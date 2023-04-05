import React from "react";
import { brandingData } from "../../../static/data";
import styles from "../../../styles/styles";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  return (
    <>
      <div className={`mt-10 ${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1 className="capitalize font-semibold text-secColor">
            Shop our top categories
          </h1>
        </div>
      </div>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`my-8 mt-4 flex justify-between w-full shadow-sm bg-white p-3 lg:p-4 rounded-md `}
        >
          {brandingData &&
            brandingData.map((item, index) => (
              <div className="flex items-center lg:gap-3" key={index}>
                <item.icon className="text-4xl text-secColor" />
                <div className="px-3">
                  <h3 className="font-bold text-priColor text-xs xl:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-xs xl:text-sm text-secColor xl:font-medium">
                    {item.Description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <CategoryItem />
    </>
  );
};

export default Categories;
