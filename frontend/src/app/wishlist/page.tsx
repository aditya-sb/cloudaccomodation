"use client";

import Bookings from "../components/bookings/Bookings";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Wishlist from "../components/wishlist";

export default function BookingsPage() {
  return (
    <div>
      <Header isPropertyPage={false}/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Bookings</h1>
        <Wishlist />
      </div>
      <Footer />
    </div>
  );
} 