import PropertyDetails from "./PropertyDetails";
import PropertyGallery from "./PropertyGallery";
import Map from "./Map";
import BuyerReviews from "./BuyerReviews";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingDetails from "./BookingDetails";
import PropertyCard from "../components/PropertyCard";
import Dropdown from "../components/Dropdown";
import {
  FaBolt,
  FaDollarSign,
  FaHeadset,
  FaUndo,
  FaCheck,
} from "react-icons/fa";

export default function PropertyPage() {
  return (
    <>
      <Header isPropertyPage={true} />
      <div
        className="min-h-screen p-5 max-sm:p-0 flex flex-col md:flex-row gap-8"
        style={{
          backgroundColor: "var(--gray-bg)",
          color: "var(--foreground)",
        }}
      >
        {/* Left Section: 60% */}
        <div
          className="w-full pt-20 pb-5 border rounded-lg px-4  md:w-4/5"
          style={{
            backgroundColor: "var(--card)",
            color: "var(--foreground)",
          }}
        >
          {/* Property Gallery */}
          <PropertyGallery
            images={[
              "/images/cottage.jpeg",
              "/images/luxuryinside.jpeg",
              "/images/property-logo.png",
            ]}
          />

          {/* Property Details */}
          <PropertyDetails
            title="Luxury Villa in Beverly Hills"
            location="Beverly Hills, CA"
            price="$5,000,000"
            description="A breathtaking villa with stunning ocean views and luxurious amenities."
            features={["5 Bedrooms", "4 Bathrooms", "Swimming Pool", "Garden"]}
          />

          {/* Map */}
          <Map
            location="Beverly Hills, CA"
            lat={34.0736204}
            lon={-118.4003563}
          />

          {/* Buyer Reviews */}
          <BuyerReviews />
        </div>

        {/* Right Section: 40% */}
        <div className="w-full rounded-lg md:w-2/5 p-4"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
           }}>
          <div className="sticky top-20 p-4 rounded-lg shadow-sm">
            <h1 className="text-xl font-semibold p-4 ">
              Luxury Villa in Beverly Hills
            </h1>
            <div className="rounded-lg overflow-hidden mt-4">
              <Dropdown
                className="border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                title="Instant Booking" 
                icon={<FaBolt size={14} />}
              >
                <p>Details about instant booking go here...</p>
              </Dropdown>
              <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="Lowest Price Guaranteed" 
                icon={<FaDollarSign size={14} />}
              >
                <p>Details about price guarantee go here...</p>
              </Dropdown>
              <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="Verified Properties" 
                icon={<FaCheck size={14} />}
              >
                <p>Details about verified properties go here...</p>
              </Dropdown>
              <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="24x7 Personal Assistance" 
                icon={<FaHeadset size={14} />}
              >
                <p>Details about personal assistance go here...</p>
              </Dropdown>
              <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="5.8K+ Reviews" 
                icon={<FaUndo size={14} />}
              >
                <p>Details about reviews go here...</p>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {/* Related Properties (Full-Width Section) */}
      <div
        className="bg-gray-100 py-10 w-full"
        style={{
          backgroundColor: "var(--background)",
        }}
      >
        <h2
          className="text-3xl sm:text-4xl mt-7 font-extrabold text-center mb-10"
          style={{
            color: "var(--foreground)",
          }}
        >
          Related Properties
        </h2>

        <section className="pb-5 grid grid-cols-1 md:grid-cols-3 gap-8 px-10 max-w-[1440px] mx-auto">
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
      </div>

      {/* Booking Details */}
      <BookingDetails price="$5,000" booking={true} />
      <Footer />
    </>
  );
}
