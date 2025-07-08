import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Star, StarIcon } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';

const reviews = [
  {
    name: 'Simranjeet Kaur',
    review: 'Cloud Accommodation really helped me find a place before I landed in Canada. I booked from India and only had to pay the deposit. When I reached Brampton, the landlord was already waiting. Super easy and stress-free experience!',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    name: 'Karan Reddy',
    review: 'Honestly, I was struggling to find safe housing near my college in Toronto. A friend told me about Cloud Accommodation. I spoke to their agent and they helped me finalize a room within 3 days. Very responsive team and the listing was exactly as shown.',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    name: 'Pooja Verma',
    review: 'I was nervous about booking from India without seeing the property, but Cloud Accommodation gave me confidence. They shared videos, photos, and even connected me with the landlord before payment. It made the whole process smooth. Highly recommend for girls moving alone.',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    name: 'Kwame Nkrumah',
    review: 'Big thanks to Cloud Accommodation! I arrived from Ghana and didn’t know anyone here. The apartment I booked was clean, close to public transport, and affordable. Their WhatsApp support was also really helpful.',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    name: 'Deepak Singh',
    review: 'I found them on Instagram and thought to try. Their team gave honest advice and I paid just a small fee to confirm my spot. I like that they only list verified properties. It’s a great platform for new students.',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    name: 'Abisola Adeyemi',
    review: 'At first, I didn’t trust online bookings, but Cloud Accommodation proved me wrong. They were professional and kept in touch until I reached my apartment in Halifax. I appreciate the transparency and fair pricing.',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    name: 'Sanjana Iyer',
    review : 'Loved the service. I reached Canada last month and had no idea how to rent here. Cloud Accommodation helped me find a shared room with other students. Safe, neat, and no agent drama. I’ll recommend them to my juniors back home!',
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
        centeredSlides={false}
        slidesPerGroup={1}
        slidesOffsetBefore={0}
        slidesOffsetAfter={0}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="px-10"
        breakpoints={{
          // when  width is >= 768px (tablet/desktop)
          768: {
            slidesPerView: 4.5,
            spaceBetween: 20,
          }
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white text-black p-6 rounded-lg shadow-md flex flex-col items-center max-w-xs h-full">
              <div className="flex w-full items-center justify-end gap-1">
                <img src="/images/icons/5stars.png" alt="Star" className="w-25 h-6" />
              </div>
              <p className="mt-4 text-sm text-center flex-1 overflow-hidden line-clamp-5">{review.review}</p>
              <div className="flex w-full justify-start mt-4 items-center gap-2">
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
