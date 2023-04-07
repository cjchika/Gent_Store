import React from "react";
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

const brandsLogo = [
  "https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png",
  "https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/LG_logo_%282015%29.svg/2560px-LG_logo_%282015%29.svg.png",
  "https://www.pngmart.com/files/10/Apple-Logo-PNG-Photos.png",
  "https://pngimg.com/d/microsoft_PNG17.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
];

const Brands = () => {
  return (
    <>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1 className="text-secColor">Popular Brands</h1>
        </div>
      </div>
      <div className={`flex  py-8 mb-12 cursor-pointer rounded-xl`}>
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
              slidesPerView: 2,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
            1700: {
              slidesPerView: 6,
              spaceBetween: 15,
            },
          }}
        >
          {brandsLogo.map((logoImg) => (
            <SwiperSlide
              className="flex items-center justify-around w-full"
              key={Math.random()}
            >
              <img
                className="w-[100px] object-contain grayscale opacity-50"
                src={logoImg}
                alt="logo"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Brands;
