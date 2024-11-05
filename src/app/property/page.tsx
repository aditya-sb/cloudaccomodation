// src/app/propertyPage.tsx
import PropertyDetails from "./PropertyDetails";
import PropertyGallery from "./PropertyGallery";
import Map from "./Map";
import BuyerReviews from "./BuyerReviews";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PropertyPage() {
  return (<>
      <Header/>
    <div className="bg-gray-950 min-h-screen text-white p-10 pt-40">
      <PropertyGallery images={["/images/cottage.jpeg", "/images/luxuryinside.jpeg", "/images/property-logo.png"]} />
      <PropertyDetails
        title="Luxury Villa in Beverly Hills"
        location="Beverly Hills, CA"
        price="$5,000,000"
        description="A breathtaking villa with stunning ocean views and luxurious amenities."
        features={["5 Bedrooms", "4 Bathrooms", "Swimming Pool", "Garden"]}
      />
      <Map location="Beverly Hills, CA" />
      <BuyerReviews />
    </div>
      <Footer/>
    </>
  );
}
