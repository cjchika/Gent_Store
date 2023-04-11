import React from "react";
import { categories } from "../../../static/data";
import { useNavigate } from "react-router-dom";
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

const CategoryItem = () => {
  const handleSelect = (item) => {
    navigate(`/products?category=${item}`);
  };

  const navigate = useNavigate();

  return (
    <div className={` bg-white p-5 rounded-lg mb-5 `} id="categories">
      <Swiper
        grabCursor={true}
        id="main"
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 6,
            spaceBetween: 5,
          },
          900: {
            slidesPerView: 7,
            spaceBetween: 5,
          },
          1200: {
            slidesPerView: 9,
            spaceBetween: 5,
          },
          1700: {
            slidesPerView: 9,
            spaceBetween: 5,
          },
        }}
      >
        {categories.map((item, index) => (
          <SwiperSlide
            key={index}
            onClick={() => handleSelect(item.title)}
            className="cursor-pointer "
          >
            <div className="mx-auto bg-priColor bg-opacity-10 hover:bg-opacity-20 rounded-lg w-[100px] h-[100px]">
              <img
                src={item.img}
                className="w-[75%] hover:w-[90%] h-full object-contain mx-auto"
              />
            </div>
            <h1 className="text-center text-secColor mt-2 lg:font-semibold">
              {item.subTitle}
            </h1>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryItem;
