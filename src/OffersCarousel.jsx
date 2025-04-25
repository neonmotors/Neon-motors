

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";


const carOffers = [
  {
    name: "Hyundai IONIQ 5",
    price: "₹4,00,000*",
    image: "/images/iconic.png",
  },
  {
    name: "Hyundai Verna",
    price: "₹65,000*",
    image: "/images/verna.png",
  },
  {
    name: "Hyundai Venue",
    price: "₹70,000*",
    image: "/images/Venue.png",
  },
  {
    name: "Hyundai Creta-Electric",
    price: "₹65,000*",
    image: "/images/creta-electric.png",
  },
  {
    name: "Mahindra Thar ROXX",
    price: "₹65,000*",
    image: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Thar-ROXX/8438/1723692413550/front-left-side-47.jpg",
  },
  {
    name: "Mahindra BE 6",
    price: "₹60,000*",
    image: "https://img.gaadicdn.com/images/car-images/large/Mahindra/BE-6/9263/1739254827715/225_Mahindra-BE-6e_Tango-Red_b60028.jpg",
  },
 
  {
    name: "Mahindra XEV 9e",
    price: "₹53,000*",
    image: "https://img.gaadicdn.com/images/car-images/large/Mahindra-XEV/9e/9262/1732772711472/223_Mahindra-XEV-9e_Desert-Myst_787b6d.jpg",
  },

 
];

function OffersCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="bg-[#392e2e] text-white py-8">
      <h2 className="mb-6 text-3xl font-bold text-center">Our Exclusive Offers</h2>

      <div className="relative px-6 mx-auto max-w-7xl">
        {/* Previous Button */}
        <button
          ref={prevRef}
          className="absolute left-0 z-10 p-3 text-white -translate-y-1/2 bg-gray-800 rounded-full cursor-pointer top-1/2 hover:bg-gray-700"
        >
          ❮
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          onSwiper={setSwiperInstance} // Store swiper instance
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {carOffers.map((car, index) => (
            <SwiperSlide key={index}>
              <div className="relative p-5 transition-transform bg-white shadow-xl rounded-xl hover:scale-105">
                <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white bg-red-600 rounded-bl-lg">
                  OFFER
                </div>
                <img
                  src={car.image}
                  alt={car.name}
                  width={350}
                  height={250}
                  className="w-full rounded-lg"
                />
                <h3 className="mt-4 text-xl font-semibold text-blue-900">{car.name}</h3>
                <p className="text-lg font-bold text-red-600">
                  <span className="text-black text-md">Save up to:</span> {car.price}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next Button */}
        <button
          ref={nextRef}
          className="absolute right-0 z-10 p-3 text-white -translate-y-1/2 bg-gray-800 rounded-full cursor-pointer top-1/2 hover:bg-gray-700"
        >
          ❯
        </button>
      </div>

      <p className="mt-3 text-sm text-gray-400 text-end">*TnC apply</p>
    </div>
  );
}

export default OffersCarousel;