"use client";

import { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);
  const validThumbsSwiper =
    thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null;

  return (
    <div className="w-full min-w-0 shadow p-4 bg-white rounded-xl lg:sticky top-4">
      <Swiper
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={10}
        thumbs={{ swiper: validThumbsSwiper, autoScrollOffset: 1 }}
        onSlideChange={(swiper) => {
          if (validThumbsSwiper) {
            validThumbsSwiper.slideTo(swiper.realIndex);
          }
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="productMain"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image}>
            <img
              src={image}
              alt={`${title} image ${index + 1}`}
              className="h-80 w-full object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        direction="horizontal"
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={3.5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="productThumbs mt-4"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image}>
            <button
              type="button"
              className="w-full border-4 border-transparent duration-100"
            >
              <img
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                className="h-32 w-full cursor-pointer object-cover"
              />
            </button>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
