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
import Header from "./components/Header";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <Header />
      <SearchBar />

      {/* Banner Section */}
      <section className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
        <img
          src="/images/banner-friends.png"
          alt="Friends relaxing in a cozy space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div
          className="absolute inset-y-0 left-0 flex flex-col justify-center px-6 sm:px-10 max-w-md sm:max-w-lg"
          style={{
            color: "var(--foreground)",
          }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            A Lifestyle Tailored Just for You
          </h1>
          <p className="text-sm sm:text-lg text-gray-200">
            Discover a space that feels like home and a lifestyle that reflects
            who you are. From curated services to unique spaces, we offer more
            than just a place to live; we bring you a community.
          </p>
        </div>
      </section>

      {/* Explore Properties Section */}
      <h2
        className="text-3xl sm:text-4xl mt-7 font-extrabold text-center mb-10"
        style={{
          color: "var(--foreground)",
        }}
      >
        Explore Properties
      </h2>
      <section className="px-4 sm:px-6 pb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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

      {/* Cities Section */}
      <Cities />

      {/* Other Sections */}
      <div className="space-y-6 mt-8">
        <PrivacySection />
        <MoveInSection />
        <SecurityDepositSection />
        <NestNetworkSection />
      </div>


      {/* Booking Button */}
      <div className="flex justify-center m-10">
        <BookingButton />
      </div>

      {/* Other Services */}
      <OtherServices />

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Refer and Earn Section */}
      <section
        className="relative w-full h-[300px] sm:h-[400px] overflow-hidden flex items-center justify-center"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground) ",
        }}
      >
        <img
          src="/images/refer.png"
          alt="Refer and Earn"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6 sm:px-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Refer and Earn</h2>
          <p className="text-sm sm:text-lg mb-6">
            Share the joy of premium living! Refer your friends to join, and for
            every successful referral, receive exclusive rewards.
          </p>
          <ul className="text-sm sm:text-lg list-disc list-inside">
            <li>Sign up and get your unique referral link</li>
            <li>Share with friends who are looking for a new home</li>
            <li>Earn rewards for each successful referral</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
