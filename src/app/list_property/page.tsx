// src/app/page.tsx

import CustomerReviews from "../components/CustomerReviews";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Form from "./form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="pt-16"> {/* Adjust `pt-16` based on your header height */}
        <Form />
      </div>
      <CustomerReviews />
      <Footer />
    </div>
  );
}
