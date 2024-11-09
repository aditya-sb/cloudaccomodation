// src/app/page.tsx

import SearchBar from "./components/SearchBar";
import PropertyCard from "./components/PropertyCard";
import CustomerReviews from "./components/CustomerReviews";
import Footer from "./components/Footer";
import Cities from "./components/Cities";
import OtherServices from "./components/OtherServices";
import PrivacySection from "./components/PrivacySection";
import MoveInSection from "./components/MoveInSection";
import SecurityDepositSection from "./components/SecurityDepositSection";
import NestNetworkSection from "./components/NestNetworkSection";
import BookingButton from "./components/BookingButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* <Header /> */}
      <SearchBar />
      <section className="relative w-full h-[400px] overflow-hidden">
        <img
          src="/images/banner-friends.png"
          alt="Friends relaxing in a cozy space"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-10 text-white max-w-md">
          <h1 className="text-4xl font-bold mb-4">
            A Lifestyle Tailored Just for You
          </h1>
          <p className="text-lg text-gray-200">
            Discover a space that feels like home and a lifestyle that reflects
            who you are. From curated services to unique spaces, we offer more
            than just a place to live; we bring you a community.
          </p>
        </div>
      </section>
      
         <h2 className="text-3xl mt-7 font-extrabold text-center text-white mb-10">
            Explore Properties
          </h2>
      <section className="px-6 pb-5 grid grid-cols-1 md:grid-cols-3 gap-8">
        <PropertyCard
          image="/images/mordenhouse.webp"
          title="Modern Family Home"
          location="Beverly Hills, CA"
          price="$2,500,000"
          description="A beautiful home with four bedrooms, a spacious living area, and a private pool."
        />
        <PropertyCard
          image="/images/luxuryinside.jpeg"
          title="Luxury City Apartment"
          location="New York, NY"
          price="$1,800,000"
          description="Stylish two-bedroom apartment with stunning views of the skyline."
        />
        <PropertyCard
          image="/images/cottage.jpeg"
          title="Cozy Country Cottage"
          location="Aspen, CO"
          price="$850,000"
          description="Charming cottage with two bedrooms and a beautiful garden in a tranquil setting."
        />
      </section>
      <Cities/>
      <div className="space-y-6 mt-8">
          <PrivacySection />
          <MoveInSection />
          <SecurityDepositSection />
          <NestNetworkSection />
        </div>
        <div className="flex justify-center m-10">
          <BookingButton />
        </div>
      <OtherServices/>
      <CustomerReviews />
      <section className="relative w-full h-[300px] overflow-hidden">
        <img
          src="/images/refer.jpg"
          alt="refer and earn"
          className="w-full h-full object-cover cursor-pointer"
        />
        </section>
      <Footer />
    </div>
  );
}
