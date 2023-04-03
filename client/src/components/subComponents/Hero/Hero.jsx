import React from "react";
import { heroData } from "../../../static/data";
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
                backgroundPosition: "top",
                backgroundImage: `url(${item.backgroundImg})`,
                backgroundSize: "cover",
              }}
            >
              <div className="h-[400px] p-8 flex items-center justify-between">
                <div>
                  <h1 className="text-white">{item.title}</h1>
                </div>
                <div>
                  <img className="w-full h-[350px]" src={item.image} />
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
