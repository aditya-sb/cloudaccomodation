import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Star, StarIcon } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';

const reviews = [
  {
    name: 'Kishan Singh',
    review: 'Cloud Accommodation made finding housing stress-free. My personal agent guided me every step of the way—highly recommend!',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    name: 'Kishan Singh',
    review: 'Cloud Accommodation made finding housing stress-free. My personal agent guided me every step of the way—highly recommend!',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    name: 'Kishan Singh',
    review: 'Cloud Accommodation made finding housing stress-free. My personal agent guided me every step of the way—highly recommend!',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    name: 'Kishan Singh',
    review: 'Cloud Accommodation made finding housing stress-free. My personal agent guided me every step of the way—highly recommend!',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    name: 'Kishan Singh',
    review: 'Cloud Accommodation made finding housing stress-free. My personal agent guided me every step of the way—highly recommend!',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    name: 'Jasmine kt',
    review: 'Cloud Accommodation made finding housing stress-free. My personal agent guided me every step of the way—highly recommend!',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    name: 'Kishan Singh',
    review: 'Cloud Accommodation made finding housing stress-free. My personal agent guided me every step of the way—highly recommend!',
    avatar: 'https://via.placeholder.com/50',
  },
];

const ReviewSection = () => {
  return (
    <div className="bg-gradient-to-l from-blue-400 to-blue-700 py-10 text-white text-center px-6">
      <div className='flex flex-row justify-between items-center mb-6'>
      <h2 className="text-xl font-semibold mb-6">Trusted by Our Growing Community</h2>
      <div className="flex md:flex hidden justify-center items-center gap-4 mb-4">
        <span className="text-sm font-medium">Excellent 4.9 out of 5</span>
        <div className="flex justify-center items-center gap-2 bg-white text-green-600 px-2 py-1 rounded-md text-xs font-bold"><StarIcon/><p>Trustpilot</p></div>
      </div>
      </div>
      <Swiper
        slidesPerView={1.5}
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="px-10"
        breakpoints={{
          // when window width is >= 768px (tablet/desktop)
          768: {
            slidesPerView: 4.5,
            spaceBetween: 20,
          }
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white text-black p-6 rounded-lg shadow-md flex flex-col items-center max-w-xs">
              <div className="flex w-full items-center justify-end gap-1">
                <img src="/images/icons/5stars.png" alt="Star" className="w-25 h-6" />
              </div>
              <p className="mt-4 text-sm text-center">{review.review}</p>
              <div className="flex w-full justify-start  mt-4 flex items-center gap-2">
              <FaUserCircle className="w-10 h-10 text-gray-500" /> {/* Use the profile icon */}
                <span className="font-semibold">{review.name}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex max-sm:flex hidden justify-center items-center gap-4 mt-8">
        <span className="text-sm font-medium">Excellent 4.9 out of 5</span>
        <div className="flex justify-center items-center gap-2 bg-white text-green-600 px-2 py-1 rounded-md text-xs font-bold"><StarIcon/><p>Trustpilot</p></div>
      </div>
      <div className='md:flex hidden justify-center items-center'>
      <button className=" mt-6 px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">Read Reviews</button>
      </div>
    </div>
  );
};

export default ReviewSection;
