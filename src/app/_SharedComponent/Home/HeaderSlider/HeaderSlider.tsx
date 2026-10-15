"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import sliderImg from "../../../../assets/img/home-slider-1.d79601a8.png";
import Link from "next/link";
export default function HeaderSlider() {
  return (
    <>
      <Swiper
        loop={true}
        cssMode={true}
        navigation={true}
        pagination={{
          clickable: true,
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-white !w-6 !rounded-full",
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper headerSwiper"
      >
        <SwiperSlide>
          <div className="relative h-100 w-full overflow-hidden">
            <Image src={sliderImg} alt="Slider Image" className="h-full w-full object-cover" />
            <div className="overlay text-white p-10 py-20 w-full h-full absolute inset-0 flex justify-center flex-col">
              <h2 className="font-bold text-3xl max-w-sm mb-4">Fresh Products Delivered to your Door</h2>
              <p>Get 20% off your first order</p>
              <div className="mt-4 headerBtns">
                <Link href="" className="text-green-500 font-semibold py-2 px-6 bg-white rounded-lg border-2 border-white">
                  Shop Now
                </Link>
                <Link href="" className="font-semibold py-2 px-6 rounded-lg border-2 border-white ml-2">
                  View Deals
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-100 w-full overflow-hidden">
            <Image src={sliderImg} alt="Slider Image" className="h-full w-full object-cover" />
            <div className="overlay text-white p-10 py-20 w-full h-full absolute inset-0 flex justify-center flex-col">
              <h2 className="font-bold text-3xl max-w-sm mb-4">Premium Quality Guaranteed</h2>
              <p>Fresh from farm to your table</p>
              <div className="mt-4 headerBtns">
                <Link href="" className="text-sky-600 font-semibold py-2 px-6 bg-white rounded-lg border-2 border-white">
                  Shop Now
                </Link>
                <Link href="" className="font-semibold py-2 px-6 rounded-lg border-2 border-white ml-2">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-100 w-full overflow-hidden">
            <Image src={sliderImg} alt="Slider Image" className="h-full w-full object-cover" />
            <div className="overlay text-white p-10 py-20 w-full h-full absolute inset-0 flex justify-center flex-col">
              <h2 className="font-bold text-3xl max-w-sm mb-4">Fast & Free Delivery</h2>
              <p>Same day delivery available</p>
              <div className="mt-4 headerBtns">
                <Link href="" className="text-fuchsia-600 font-semibold py-2 px-6 bg-white rounded-lg border-2 border-white">
                  Order Now
                </Link>
                <Link href="" className="font-semibold py-2 px-6 rounded-lg border-2 border-white ml-2">
                  Delivery Info
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
