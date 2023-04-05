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
  const navigate = useNavigate();
  return (
    <div className={` bg-white p-6 px-8 rounded-lg mb-5 flex`} id="categories">
      {categories &&
        categories.map((item, index) => {
          const handleSubmit = (i) => {
            navigate(`/products?category=${item.title}`);
          };
          return (
            <Swiper
              modules={Autoplay}
              grabCursor={true}
              id="sec"
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              // breakpoints={{
              //   0: {
              //     slidesPerView: 2,
              //     spaceBetween: 5,
              //     cssMode: true,
              //   },
              //   768: {
              //     slidesPerView: 3,
              //     spaceBetween: 10,
              //     cssMode: true,
              //   },
              //   900: {
              //     slidesPerView: 4,
              //     spaceBetween: 20,
              //   },
              //   1200: {
              //     slidesPerView: 5,
              //     spaceBetween: 25,
              //   },
              //   1700: {
              //     slidesPerView: 6,
              //     spaceBetween: 30,
              //   },
              // }}
            >
              <SwiperSlide
                key={index}
                onClick={handleSubmit}
                className="cursor-pointer"
              >
                <div className="bg-priColor bg-opacity-20 rounded-lg w-[100px] h-[100px]">
                  <img
                    src={item.img}
                    className="w-full h-full object-contain mx-auto"
                  />
                </div>
                <h1 className="text-center">{item.title}</h1>
              </SwiperSlide>
            </Swiper>
          );
        })}
    </div>
  );
};

export default CategoryItem;
