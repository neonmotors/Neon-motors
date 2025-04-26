import { addDoc, collection, Timestamp } from 'firebase/firestore';

import { Link, useNavigate } from 'react-router-dom';
import { db } from './lib/firebase';
import OffersCarousel from './OffersCarousel';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
// import {AboutUs} from './AboutUs'
import BannerSlider from './Banner.js';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { ToastContainer} from 'react-toastify';

import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Home,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CgSpinner } from 'react-icons/cg';
import Slider from './Banner.js';
import Outlets from './Outlets.js';
import ShowroomCard from './Showrooms.js';

// import Popup from "./popup";

const InterestForm = () => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    model: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitted(false);

    let newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile))
      newErrors.mobile = 'Valid 10-digit mobile number is required';
    if (!form.model) newErrors.model = 'Please select a car model';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Please enter a valid email address';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        // Add a new document in collection "leads(table name)"
        await addDoc(collection(db, 'leads'), {
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          model: form.model,
          timestamp: Timestamp.now(),
        });
        toast.success('successfully submited')

        navigate('/thank-you');
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong!');
      } finally {
        setLoading(false);
      }
    }
  };

  const Homebanners = [
    'https://images.dealersites.cardekho.com/2483/banner/newcretainnerkv-pc-19486.jpg',
    'https://mahindraimages.dealersites.in/oem_banner/1600x500--3--61.jpg',
    'https://images.dealersites.cardekho.com/2483/banner/hyundai-ioniq-5-copy-17792.jpg',
    'https://mahindraimages.dealersites.in/oem_banner/thar-the-suvd-1-60.jpg',
  ];

  return (
    <>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
//transition={Bounce}
/>
      <nav className='fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 py-3 shadow-md bg-white/30 md:px-12 lg:px-16 backdrop-blur-lg'>
        {' '}
        {/* bg-white/30*/}
        <Link to={'/'}>
          <img
            src={require('./images/logo.png')}
            className='h-12'
            alt='Hyundai Logo'
          />
        </Link>
        <a
          className='text-lg font-semibold text-gray-900'
          href='tel:+918008004996'
        >
          📞 8008004996
        </a>
      </nav>

      <div className='mt-20'>
        <Slider images={Homebanners} />
      </div>

      {/* Form Section - Positioned Below Banner on Small Screens */}
      <div className='flex justify-center w-full px-4 py-8 bg-white lg:py-12 lg:w-full'>
        <div className='w-full p-6 bg-white shadow-lg sm:p-8 md:p-10 rounded-2xl lg:w-full'>
          <h3 className='pb-6 text-xl font-bold text-center text-black sm:text-2xl'>
            REGISTER YOUR INTEREST
          </h3>

          {!submitted && (
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Name & Mobile Number in One Row for Large Screens */}
              <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                {/* Name */}
                <input
                  type='text'
                  name='name'
                  placeholder='Name'
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading}
                  className='w-full px-4 py-2 text-sm text-left text-black bg-transparent border-b-2 border-black sm:text-base focus:outline-none'
                />
                {errors.name && (
                  <p className='text-xs text-red-500'>{errors.name}</p>
                )}

                {/* Mobile Number */}
                <input
                  type='text'
                  name='mobile'
                  placeholder='Mobile Number'
                  value={form.mobile}
                  onChange={handleChange}
                  disabled={loading}
                  className='w-full px-4 py-2 text-sm text-left text-black bg-transparent border-b-2 border-black sm:text-base focus:outline-none'
                />
                {errors.mobile && (
                  <p className='text-xs text-red-500'>{errors.mobile}</p>
                )}
              </div>

              {/* Email & Car Model in One Row for Large Screens */}
              <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                {/* Email */}
                <input
                  type='email'
                  name='email'
                  placeholder='Email (optional)'
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading}
                  className='w-full px-4 py-2 text-sm text-left text-black bg-transparent border-b-2 border-black sm:text-base focus:outline-none'
                />

                {/* Car Model Dropdown */}
                <select
                  name='model'
                  value={form.model}
                  onChange={handleChange}
                  disabled={loading}
                  className='w-full px-4 py-2 text-sm text-left text-black bg-transparent border-b-2 border-black sm:text-base focus:outline-none'
                >
                  <option value='disable'>Select Model</option>
                  <option value='Hyundai Creta EV'>Hyundai Creta EV</option>
                  <option value='Hyundai Verna'>Hyundai Verna</option>
                  <option value='Hyundai Venue'>Hyundai Venue</option>
                  <option value='Hyundai IONIQ-5'>Hyundai IONIQ-5</option>
                  <option value='THAR ROXX'>THAR ROXX</option>
                  <option value='Mahindra BE 6'>Mahindra BE 6</option>
                  <option value='Mahindra XEV 9e'>Mahindra XEV 9e</option>
                 
                 
                </select>
                {errors.model && (
                  <p className='text-xs text-red-500'>{errors.model}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className='w-full py-3 text-sm font-bold text-white transition duration-200 bg-black rounded-lg sm:text-base hover:bg-gray-800'
              >
                {loading ? (
                  <div className='flex items-center justify-center'>
                    <CgSpinner className='w-5 h-5 mr-2 text-white animate-spin' />
                    Submitting...
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          )}

          <p className='mt-3 text-xs text-center text-gray-600'>
            *Disclaimer: By clicking 'Submit', you have agreed to our Terms and
            Conditions.
          </p>
        </div>
      </div>
      {/* <Popup/> */}
      <OffersCarousel />
      {/* <CarShowcase /> */}
      <AboutSection />
      {/* <Outlets /> */}
      <Showrooms/>
      <Showrooms2/>
      
      {/* <FeaturesSection /> */}
      <Footer />
    </>
  );
};

export default InterestForm;

const colors = [
  {
    name: 'White',
    code: '#FFFFFF',
    img: 'https://imgd.aeplcdn.com/600x337/n/g8ajt9b_1804861.jpg?q=80',
  },
  {
    name: 'Black',
    code: '#000000',
    img: 'https://imgd.aeplcdn.com/600x337/n/xacjt9b_1804863.jpg?q=80',
  },
  {
    name: 'Gray',
    code: '#808080',
    img: 'https://imgd.aeplcdn.com/600x337/n/xfq8t9b_1804851.jpg?q=80',
  },
  {
    name: 'Blue',
    code: '#0033CC',
    img: 'https://imgd.aeplcdn.com/600x337/n/08u8t9b_1804857.jpg?q=80',
  },
  {
    name: 'Red',
    code: '#CC0000',
    img: 'https://imgd.aeplcdn.com/600x337/n/28v8t9b_1804859.jpg?q=80',
  },
];

function CarShowcase() {
  const [selectedCar, setSelectedCar] = useState(colors[0]);

  return (
    <section className='bg-white px-6 sm:px-10 py-12 relative max-w-[1400px] mx-auto'>
      <div className='flex flex-col items-center justify-between lg:flex-row'>
        {/* Text Section */}
        <div className='px-4 text-center lg:w-1/2 lg:text-left'>
          <h2 className='text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl'>
            Hyundai CRETA Electric
          </h2>
          <p className='mt-2 text-lg font-medium text-gray-700'>
            Undisputed. Ultimate. Now electric.
          </p>
          <p className='max-w-lg mx-auto mt-4 text-gray-500 lg:mx-0'>
            The iconic SUV, in its electric avatar, is here to take your driving
            experience to the next level. Building on the undisputed ultimate
            machine, the car seamlessly merges design, performance, technology,
            and style.
          </p>

          {/* Buttons */}
          <div className='flex flex-col items-center gap-4 mt-6 sm:flex-row lg:items-start'>
            <button className='px-6 py-2 text-blue-500 transition border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white'>
              Brochure
            </button>
            <a href='#' className='flex items-center text-lg text-blue-500'>
              Register your Interest <span className='ml-2'>→</span>
            </a>
          </div>
        </div>

        {/* Car Image Section */}
        <div className='relative flex justify-center mt-10 lg:w-1/2 lg:mt-0'>
          {/* Background Color Block */}
          <div
            className='absolute top-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[420px] rounded-lg -z-10'
            style={{ backgroundColor: selectedCar.code }}
          ></div>

          {/* Car Image */}
          <img
            src={selectedCar.img}
            alt={`CRETA Electric - ${selectedCar.name}`}
            className='w-[85%] sm:w-[65%] lg:w-[90%] max-w-xs sm:max-w-md lg:max-w-lg relative z-10'
          />
        </div>
      </div>

      {/* Color Selection Dots */}
      <div className='flex justify-center mt-6 space-x-3 lg:justify-end lg:pl-4'>
        {colors.map((car) => (
          <button
            key={car.name}
            className={`w-6 h-6 rounded-full border-2 transition-transform duration-200 focus:ring focus:ring-gray-300 ${
              selectedCar.name === car.name
                ? 'border-black scale-110 ring-2 ring-black'
                : 'border-gray-400'
            }`}
            style={{ backgroundColor: car.code }}
            onClick={() => setSelectedCar(car)}
            aria-label={`Select ${car.name} color`}
          ></button>
        ))}
      </div>
    </section>
  );
}

const Footer = () => {
  return (
    <footer className='pt-12 text-gray-200 bg-gray-800'>
      <div className='grid grid-cols-2 gap-8 px-4 pb-8 mx-auto text-sm max-w-7xl md:grid-cols-5'>
        <div>
          <h3 className='mb-4 font-bold'>HYUNDAI CARS</h3>
          <h3 className='mb-4 font-bold'>MAHINDRA CARS</h3>
        </div>

        <div>
          <h3 className='mb-4 font-bold'>OUTLETS</h3>
          <ul className='space-y-2'>
            <li>Showrooms</li>
            <li>Workshops</li>
            <li>Used Cars</li>
          </ul>
        </div>

        <div>
          <h3 className='mb-4 font-bold'>USED CARS</h3>
          <ul className='space-y-2'>
            <li>Buy Car</li>
            <li>Sell Car</li>
          </ul>
        </div>

        <div>
          <h3 className='mb-4 font-bold'>ABOUT US</h3>
          <ul className='space-y-2'>
            <li>About Neon Hyundai</li>
            <li>Gallery</li>
            <li>Testimonials</li>
            <li>Contact Us</li>
            <li>Career</li>
          </ul>
        </div>

        <div>
          <h3 className='mb-4 font-bold'>FOLLOW US</h3>
          <div className='flex mb-4 space-x-4'>
            <a
              href='https://www.facebook.com/neonhyundaihyd/'
              className='p-2 text-gray-800 transition bg-white rounded-full hover:bg-blue-500 hover:text-white'
            >
              <FaFacebookF />
            </a>
            <a
              href='https://www.instagram.com/neon.hyundai/?utm_medium=copy_link'
              className='p-2 text-gray-800 transition bg-white rounded-full hover:bg-pink-500 hover:text-white'
            >
              <FaInstagram />
            </a>
          </div>

          {/* Address with location icon */}
          <div className='flex items-start gap-2 text-xs leading-5 text-gray-400'>
            <FaMapMarkerAlt className='mt-1 text-lg text-white' />
            <p>
              <strong>Address:</strong>
              <br />
              M R R Estate, Survey No. 26,
              <br />
              Opposite CPRI, CPRI Road,
              <br />
              Medpalli, Hyderabad,
              <br />
              Medchal Malkajgiri, Telangana – 500098
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='pt-4 mt-6 text-sm text-center border-t border-gray-700'>
        <p>
          <a href='#' className='hover:text-gray-400'>
            Terms & Conditions
          </a>{' '}
          |{' '}
          <a href='#' className='hover:text-gray-400'>
            Privacy Policy
          </a>
        </p>
        <p className='mt-2'>
          © 2025 All Rights Reserved by Neon Hyundai Motors.
        </p>
        <p className='mt-1 text-gray-500'>
          Powered by{' '}
          <a
            href='https://broaddcast.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='hover:text-red-500'>
              BroaddCast Business Solutions LLP.
            </span>
          </a>
        </p>
      </div>
    </footer>
  );
};

const features = [
  {
    image: 'https://cretaelectric.hyundai.co.in/assets/creta-DcM4ZZq5.jpg',
    title: 'Driving range up to 473 km**',
    description:
      'Say goodbye to frequent charging stops! With a driving range of up to 473 km on a single full charge**, the CRETA Electric is built for those who crave uninterrupted adventures.',
  },
  {
    image: 'https://cretaelectric.hyundai.co.in/assets/creta2-CtNK2RxL.jpg',
    title: 'Pixelated graphic grille',
    description:
      'The Hyundai CRETA Electric sets a new benchmark in design with a pixelated graphic front-grille with integrated charging port and a pixelated graphic lower bumper.',
  },
  {
    image: 'https://cretaelectric.hyundai.co.in/assets/creta7-DR7lee5y.jpg',
    title: 'Active Air Flaps#',
    description:
      'The Active Air Flap (AAF) adds a flare in style and performance, optimizing airflow for cooling and enhanced aerodynamics.',
  },
  {
    image: 'https://cretaelectric.hyundai.co.in/assets/creta3-DI0AVk7J.jpg',
    title: 'Pixelated graphic rear bumper',
    description:
      'Complementing the front design, the pixelated graphic rear bumper, and the connected LED tail lamps offer an innovative and electrifying appearance.',
  },
  {
    image: 'https://cretaelectric.hyundai.co.in/assets/creta8-CxR7ji2m.jpg',
    title: 'R17 (D=436.6 mm) Aero Alloy wheels',
    description:
      'Equipped with R17 Aero Alloy Wheels with Low Rolling Resistance (LRR) tyres, the CRETA Electric enhances aerodynamic performance, contributing to improved range efficiency.',
  },
  {
    image: 'https://cretaelectric.hyundai.co.in/assets/creta4-hp25Do38.jpg',
    title: 'Fast home charging',
    description:
      'The Hyundai CRETA Electric can be charged from 10% to 80% in just 58 minutes*** (DC charging), while the 11kW Wall Box Home fast AC charger can achieve the same charge range in an impressive 4 hours*.',
  },
];

function FeaturesSection() {
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
    <div className='px-5 py-10 bg-gray-100 md:px-20'>
      <h2 className='mb-6 font-serif text-2xl font-bold text-center text-black'>
        Features
      </h2>
      <div className='relative max-w-6xl mx-auto'>
        {/* Custom Navigation Buttons */}
        <button
          ref={prevRef}
          className='absolute left-0 z-10 p-3 transition -translate-y-1/2 bg-gray-200 rounded-full shadow-md top-1/2 hover:bg-gray-300'
        >
          <ChevronLeft size={24} />
        </button>
        <button
          ref={nextRef}
          className='absolute right-0 z-10 p-3 transition -translate-y-1/2 bg-gray-200 rounded-full shadow-md top-1/2 hover:bg-gray-300'
        >
          <ChevronRight size={24} />
        </button>

        {/* Swiper Component */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onSwiper={setSwiperInstance} // Store swiper instance
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <div className='overflow-hidden bg-white rounded-lg shadow-md'>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className='object-cover w-full h-48'
                />
                <div className='p-4'>
                  <h3 className='text-lg font-semibold text-black'>
                    {feature.title}
                  </h3>
                  <p className='mt-2 text-gray-600'>{feature.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

const AboutSection = () => {
  return (
    <section className='px-4 py-16 bg-white md:px-20'>
      <div className='grid items-center grid-cols-1 gap-12 mx-auto max-w-7xl md:grid-cols-2'>
        {/* Left: Content */}
        <div className='text-gray-800'>
          <h2 className='relative inline-block mb-6 text-4xl font-bold'>
            <span className='absolute bottom-0 left-0 w-20 h-1 -mb-1 bg-blue-600 rounded-full'></span>
            About Us
          </h2>
          <div className='space-y-5 text-[17px] leading-relaxed'>
            <p>
              <strong>Neon Motors Pvt Ltd</strong> was incorporated in April
              2013 as an authorized dealer for Mahindra & Mahindra. We expanded
              to Hyderabad in 2015 and now have 500+ dedicated employees.
            </p>
            <p>
              We're proudly associated with Hyundai, running a full-fledged 3S
              (Sales, Service, Spares) facility in the heart of Hyderabad at
              S.P. Road, Begumpet.
            </p>
            <p>
              As a trusted Hyundai dealer, we provide new and used car sales,
              financing, accessories, and after-sales service with transparency
              and excellence.
            </p>
            <p className='italic font-semibold text-blue-600'>
              We look forward to serving you!
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className='w-full'>
          <img
            src='https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Tucson/Exterior/mob/tucson-suv-exterior-top-2-image01.jpg'
            alt='Neon Motors Showroom'
            className='object-cover w-full h-auto shadow-lg rounded-xl'
          />
        </div>
      </div>
    </section>
  );
};


const showroomData = [
  {
    name: 'NEON MOTORS - CHANDA NAGAR',
    rating: 5,
    address: '1st Floor, Survey No.384, Anri Prime, above Ratnadeep Supermarket, Gangaram, Serilingampally Mandal, Chanda Nagar, Hyderabad, Telangana - 500050',
    mapImage: '',
    outletType: 'Showroom',
    workingHours: '9:00 AM - 7:00 PM',
    email: 'mahindraneon@gmail.com',
    contact: '8008001553',
    navigateLink: 'https://www.google.com/maps?q=1st+Floor,+Survey+No.384,+Anri+Prime,+above+Ratnadeep+Supermarket,+Gangaram,+Serilingampally+Mandal+Chanda+Nagar+Hyderabad+Telangana+17.49480+78.32857&z=16',
  },
  {
    name: 'NEON MOTORS - BODUPPAL',
    rating: 5,
    address: 'Survey no 26, MRR Estate, Opposite CPRI Road, Opp Piller Number P142, Peerzadiguda, Medipally, Boduppal, Hyderabad, Telangana - 500098',
    mapImage: '',
    outletType: 'Showroom',
    workingHours: '9:00 AM - 7:00 PM',
    email: 'boduppal@neonmotors.com',
    contact: '9009009553',
    navigateLink: 'https://www.google.com/maps?q=Survery+no+26,+MRR+Estate,+Opposite+CPRI+Road,+Opp+Piller+Number+P142,+Peerzadiguda,Medipally+Boduppal+Hyderabad+Telangana+17.41215+78.61295&z=16 ',
  },
  {
    name: 'NEON MOTORS - NAMPALLY (COMMERCIAL SHOWROOM)',
    address: '11-4- 813,Bazarghat,Beside Sri Bangaru Muthyalamma Temple, Nampally, Hyderabad, Telangana - 500004',
    mapImage: '',
    outletType: 'Showroom',
    workingHours: '9:00 AM - 7:00 PM',
    navigateLink: 'https://www.google.com/maps/place//@17.3945,78.4599529,17z/data=!4m6!1m5!3m4!2zMTDNEpUTHQoQUJMHLrErGJyHg89uy71MyuHF!8m2!3d17.3945!4d78.4625278?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'NEON MOTORS - ARAMGHAR',
   
    address: `H.NO 6-3-162/3/1, Plot No 11A, Indra Reddy Nagar, Aramghar 'X' Road, Shivarampally Jagir, Aramghar, Hyderabad, Telangana - 500052`,
    mapImage: '',
    outletType: 'Showroom',
    workingHours: '9:00 AM - 7:00 PM',
    email: 'boduppal@neonmotors.com',
    contact: '9009009553',
    navigateLink: 'https://www.google.com/maps?q=17.322871,78.43113&z=16',
  },
  {
    name: 'NEON MOTORS - NARSINGI',
   
    address: 'M.S Royal Function Hall, Narsingi Buildings, Osman Sagar Rd, , Narsingi, Hyderabad, Telangana - 500075',
    mapImage: '',
    outletType: 'Showroom',
    workingHours: '9:00 AM - 7:00 PM',
    email: 'boduppal@neonmotors.com',
    contact: '9009009553',
    navigateLink: 'https://www.google.com/maps?q=17.38095,78.36697&z=16',
  },
  {
    name: 'NEON MOTORS - Y JUNCTION (KUKATPALLY)',
    rating: 5,
    address: 'Address: 6-56/2, 1, Balanagar Main Rd, Bhavani Nagar,Opp. IDPL Factory, Y Junction (Kukatpally), Hyderabad, Telangana - 500018',
    mapImage: '',
    outletType: 'Showroom',
    workingHours: '9:00 AM - 7:00 PM',
    email: 'boduppal@neonmotors.com',
    contact: '9009009553',
    navigateLink: 'https://www.google.com/maps?q=Address:+6-56/2,+1,+Balanagar+Main+Rd,+Bhavani+Nagar,Opp.+IDPL+Factory+Y+Junction+(Kukatpally)+Hyderabad+Telangana+17.47228+78.43012&z=16',
  },

  
    
];
const showroomData2 = [
  {
    name: 'Neon Hyundai - Hyderabad',
    address: '160-D, METRO PILLAR NO: 1294, OPP ASHOK BHOOPAL CHAMBERS, SP ROAD, BEGUMPET, Hyderabad - 500003',
    mapImage: '',
    outletType: 'Showroom',
    workingHours: '9:00 AM - 8:00 PM',
    navigateLink: 'https://maps.google.com/',
  },
  {
    name: 'Neon Hyundai Service Center - Hyderabad',
  
    address: '160-D, METRO PILLAR NO. 1293, BEHIND NEON HYUNDAI SHOWROOM, PATNY NAGAR, SP ROAD, BEGUMPET, Hyderabad - 500003',
    mapImage: '',
    outletType: 'Workshop',
    workingHours: '9:00 AM - 8:00 PM',
    navigateLink: 'https://maps.google.com/',
  },
  {
    name: 'Neon Hyundai - Warangal',
    address: 'SY NO 423/A 423, A2 422/B, Palvelpula Rd, Bheemaram, Hanamkonda, Telangana 506015, MASTER MINDS HIGH SCHOOL, Hanamkonda - 506015',
    mapImage: '',
    outletType: 'Showroom',
    workingHours: '9:00 AM - 7:00 PM',
    email: 'boduppal@neonmotors.com',
    contact: '9009009553',
    navigateLink: 'https://maps.google.com/',
  },
  {
    name: 'Neon Hyundai - Zaheerabad',
   
    address: `Survey no. 104, sangamithra high school road, zaheerabad municipality , Zahirabad - 502220`,
    mapImage: '',
    outletType: 'Showroom',
    workingHours: '9:00 AM - 7:00 PM',
    navigateLink: 'https://maps.google.com/',
  },
  {
    name: 'Neon Hyundai Service Center - Warangal',
   
    address: 'SY. NO 130/A, Palvelpula Road, Palivelpula, Hanumakonda, Warangal Urban, Telangana, 506015, opp bharath petrol bunk , Hanamkonda - 506015',
    mapImage: '',
    outletType: 'Wrokshop',
    workingHours: '10:00 AM - 7:00 PM',
 
    navigateLink: 'https://maps.google.com/',
  },
  {
    name: 'Neon Hyundai Service Center - Zaheerabad',
    address: 'Survey no. 104, sangamithra high school road, zaheerabad municipality , Zahirabad - 502220',
    mapImage: '',
    outletType: 'Workshop',
    workingHours: '9:00 AM - 7:00 PM',
    navigateLink: 'https://maps.google.com/',
  },

  
    
];




const Showrooms = () => {
  return (
    <div className="p-6 bg-ray-100 ">
      
      {/* Heading */}
      <h2 className="mb-8 text-3xl font-bold text-center text-red-600">
        Neon Mahindra - OUTLETS
      </h2>
      
      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:pr-16 md:pl-16">
        {showroomData.map((showroom, index) => (
          <ShowroomCard key={index} showroom={showroom} />
        ))}
      </div>
        
    </div>
  );
};


const Showrooms2 = () => {
  return (
    <div className="p-6 bg-ray-100 ">
      
      {/* Heading */}
      <h2 className="mb-8 text-3xl font-bold text-center text-red-600">
        Neon HYUNDAI - OUTLETS
      </h2>
      
      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:pr-6 md:pl-16 md:grid-cols-2 lg:grid-cols-3">
        {showroomData2.map((showroom, index) => (
          <ShowroomCard key={index} showroom={showroom} />
        ))}
      </div>
        
    </div>
  );
};


