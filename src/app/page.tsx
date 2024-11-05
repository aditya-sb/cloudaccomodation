// src/app/page.tsx

import SearchBar from "./components/SearchBar";
import PropertyCard from "./components/PropertyCard";
import CustomerReviews from "./components/CustomerReviews";
import Footer from "./components/Footer";
import Cities from "./components/Cities";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* <Header /> */}
      <SearchBar />
         <h2 className="text-3xl mt-7 font-extrabold text-center text-white mb-10">
            Explore Properties
          </h2>
      <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <CustomerReviews />
      <Footer />
    </div>
  );
}
