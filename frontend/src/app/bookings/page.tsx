"use client";

import Bookings from "../components/bookings/Bookings";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BookingsPage() {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Bookings</h1>
        <Bookings />
      </div>
      <Footer />
    </div>
  );
} 