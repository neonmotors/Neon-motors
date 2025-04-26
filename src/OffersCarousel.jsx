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
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Thar-ROXX/8438/1723692413550/front-left-side-47.jpg",
  },
  {
    name: "Mahindra BE 6",
    price: "₹60,000*",
    image:
      "https://img.gaadicdn.com/images/car-images/large/Mahindra/BE-6/9263/1739254827715/225_Mahindra-BE-6e_Tango-Red_b60028.jpg",
  },
  {
    name: "Mahindra XEV 9e",
    price: "₹53,000*",
    image:
      "https://img.gaadicdn.com/images/car-images/large/Mahindra-XEV/9e/9262/1732772711472/223_Mahindra-XEV-9e_Desert-Myst_787b6d.jpg",
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
    <div className="bg-gradient-to-t from-[#1f1c2c] to-[#928DAB] text-white py-14 px-4 sm:px-8 z-[-300px] ">
      <h2 className="mb-10 text-4xl font-extrabold tracking-wide text-center">
       Our Exclusive Offers
      </h2>

      <div className="relative mx-auto max-w-7xl">
        {/* Prev Button */}
        <button
          ref={prevRef}
          className="absolute left-0 z-10 p-3 text-white -translate-y-1/2 rounded-full cursor-pointer bg-black/50 backdrop-blur-md top-1/2 hover:bg-black/70"
        >
          ❮
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          onSwiper={setSwiperInstance}
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
              <div className="relative h-full p-5 transition-transform duration-300 transform bg-white shadow-2xl rounded-2xl hover:scale-105">
                <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-red-500 rounded-bl-xl">
                  OFFER
                </div>
                <img
                  src={car.image}
                  alt={car.name}
                  className="object-cover w-full h-48 rounded-lg"
                />
                <div className="pt-4">
                  <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
                  <p className="mt-1 font-medium text-gray-600 text-md">
                    <span className="text-gray-800">Save up to: </span>
                    <span className="font-semibold text-red-600">{car.price}</span>
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next Button */}
        <button
          ref={nextRef}
          className="absolute right-0 z-10 p-3 text-white -translate-y-1/2 rounded-full cursor-pointer bg-black/50 backdrop-blur-md top-1/2 hover:bg-black/70"
        >
          ❯
        </button>
      </div>

      <p className="mx-auto mt-6 text-sm text-gray-300 text-end max-w-7xl">*T&C apply</p>
    </div>
  );
}

export default OffersCarousel;
