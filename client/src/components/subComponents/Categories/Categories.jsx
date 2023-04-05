import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categories } from "../../../static/data";
import styles from "../../../styles/styles";
import SwiperCore, {
  Pagination,
  Controller,
  Thumbs,
  Scrollbar,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
SwiperCore.use([Pagination, Controller, Thumbs, Scrollbar, Autoplay]);

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="my-10">
        <h1 className="capitalize px-10 text-xl font-medium">
          Shop our top categories
        </h1>
      </div>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md `}
        >
          {brandingData &&
            brandingData.map((item, index) => (
              <div className="flex items-center gap-3" key={index}>
                <item.icon className="text-4xl text-secColor" />
                <div className="px-3">
                  <h3 className="font-bold text-priColor text-sm md:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-secColor font-medium">
                    {item.Description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="">
          {categories &&
            categories.map((item, index) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${item.title}`);
              };
              return (
                <Swiper
                  modules={Autoplay}
                  id="main"
                  loop={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                >
                  <SwiperSlide key={index}></SwiperSlide>
                </Swiper>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
