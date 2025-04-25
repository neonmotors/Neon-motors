// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';

// const BannerSlider = () => {
//   return (
//     <section className="w-full ">
//       {/* Desktop Swiper */}
//       <div className="hidden mt-20 md:block">
//         <Swiper
//           spaceBetween={0}
//           slidesPerView={1}
//           loop={true}
//           autoplay={{ delay: 3000 }}
//           pagination={{ clickable: true }}
//           modules={[Autoplay, Pagination]}
//         >
//           <SwiperSlide>
//             {/* <a href="/about-us"> */}
//               <img src="https://images.dealersites.cardekho.com/2483/banner/newcretainnerkv-pc-19486.jpg" alt="Desktop Banner 1" className="w-full h-[500px] object-cover" />
//             {/* </a> */}
//           </SwiperSlide>
//           <SwiperSlide>
//             {/* <a href="https://example.com/offers" target="_blank" rel="noopener noreferrer"> */}
//               <img src=" https://mahindraimages.dealersites.in/oem_banner/1600x500--3--61.jpg" alt="Desktop Banner 2" className="w-full h-[500px] object-cover" />
//             {/* </a> */}
//           </SwiperSlide>
//           <SwiperSlide>
//             {/* <a href="https://example.com/offers" target="_blank" rel="noopener noreferrer"> */}
//               <img src="https://images.dealersites.cardekho.com/2483/banner/hyundai-ioniq-5-copy-17792.jpg" alt="Desktop Banner 2" className="w-full h-[500px] object-cover" />
//             {/* </a> */}
//           </SwiperSlide>
   
//           <SwiperSlide>
//             {/* <a href="https://example.com/offers" target="_blank" rel="noopener noreferrer"> */}
//               <img src="https://mahindraimages.dealersites.in/oem_banner/thar-the-suvd-1-60.jpg" alt="Desktop Banner 2" className="w-full h-[500px] object-cover" />
//             {/* </a> */}
//           </SwiperSlide>
          


         
//         </Swiper>
//       </div>

//       {/* Mobile Swiper */}
//       <div className="block mt-40 md:hidden">
//         <Swiper
//           spaceBetween={0}
//           slidesPerView={1}
//           loop={true}
//           autoplay={{ delay: 3000 }}
//           pagination={{ clickable: true }}
//           modules={[Autoplay, Pagination]}
//         >
//           <SwiperSlide >
//             {/* <a href="/mobile-deal"> */}
//               <img   src="/images/mobile-banner2.webp" alt="Mobile Banner 1" className="w-full h-[300px] object-cover" />
//             {/* </a> */}
//           </SwiperSlide>
//           <SwiperSlide>
//             {/* <a href="/book-now"> */}
//               <img src="/images/mobile-banner2.webp" alt="Mobile Banner 2" className="w-full h-[300px] object-cover" />
//             {/* </a> */}
//           </SwiperSlide>
//         </Swiper>
//       </div>
//     </section>
//   );
// };

// export default BannerSlider;




import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
export default function Slider({ images = [] }) {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        slidesPerView={1}
        className="rounded-lg"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`Slide ${idx}`}
              className="object-cover w-full h-auto rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}