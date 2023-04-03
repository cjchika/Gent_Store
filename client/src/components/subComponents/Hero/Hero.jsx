import React from "react";
import { heroData } from "../../../static/data";
import { Link } from "react-router-dom";
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

const Hero = () => {
  return (
    <div className="relative w-full">
      <Swiper
        modules={Autoplay}
        id="main"
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        style={{ width: "100%", height: "max-content" }}
      >
        {heroData.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundPosition: "bottom",
                backgroundImage: `url(${item.backgroundImg})`,
                backgroundSize: "cover",
              }}
            >
              <div className="600px:h-[450px] p-5 800px:px-[40px] flex flex-col 600px:flex-row items-center justify-start 400px:justify-between">
                <div className="block 600px:hidden h-[400px] w-full mb-8 600px:w-[50%]">
                  <img className="w-full h-full object-fill" src={item.image} />
                </div>
                <div className="w-full mb-5 600px:mb-0 600px:w-[60%] ">
                  <p className="text-white text-xl 800px:text-2xl mb-3">
                    {item.description}
                  </p>
                  <h1 className="text-white font-medium text-[30px] uppercase 800px:my-6 1000px:text-[55px]">
                    {item.title}.
                  </h1>
                  <p className="mt-3 text-white text-xl">GET UP TO 80% OFF</p>
                  <Link to="/products">
                    <button className="text-secColor hover:text-deepSecColor font-medium bg-white p-3 px-7 rounded-full mt-8 shadow-md">
                      Shop Now
                    </button>
                  </Link>
                </div>
                <div className="hidden 600px:block 600px:h-[400px] w-full 600px:w-auto">
                  <img className="w-full h-full" src={item.image} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Hero;
