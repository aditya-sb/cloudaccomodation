import PropertyDetails from "./PropertyDetails";
import PropertyGallery from "./PropertyGallery";
import Map from "./Map";
import BuyerReviews from "./BuyerReviews";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingDetails from "./BookingDetails";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";

export default function PropertyPage() {
  return (
    <>
      <Header />
      <SearchBar />
      <div className="bg-gray-950 min-h-screen text-white p-10">
        <PropertyGallery images={["/images/cottage.jpeg", "/images/luxuryinside.jpeg", "/images/property-logo.png"]} />
        <PropertyDetails title="Luxury Villa in Beverly Hills" location="Beverly Hills, CA" price="$5,000,000" description="A breathtaking villa with stunning ocean views and luxurious amenities." features={["5 Bedrooms", "4 Bathrooms", "Swimming Pool", "Garden"]} />
        <Map location="Beverly Hills, CA" />
        <BuyerReviews />
        <h2 className="text-2xl mt-7 font-extrabold text-center text-white mb-10">
          Related Properties
        </h2>
        <section className="px-6 pb-5 grid grid-cols-1 md:grid-cols-3 gap-8">
          <PropertyCard image="/images/mordenhouse.webp" title="Modern Family Home" location="Beverly Hills, CA" price="$2,500,000" description="A beautiful home with four bedrooms, a spacious living area, and a private pool." />
          <PropertyCard image="/images/luxuryinside.jpeg" title="Luxury City Apartment" location="New York, NY" price="$1,800,000" description="Stylish two-bedroom apartment with stunning views of the skyline." />
          <PropertyCard image="/images/cottage.jpeg" title="Cozy Country Cottage" location="Aspen, CO" price="$850,000" description="Charming cottage with two bedrooms and a beautiful garden in a tranquil setting." />
        </section>
      </div>
      <BookingDetails price="$5000" />
      <Footer />
    </>
  );
}
