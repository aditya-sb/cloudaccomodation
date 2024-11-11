// src/app/propertyPage.tsx
"use client";

import { Suspense } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertyContent from "./PropertyContent";

export default function PropertyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-900 text-gray-800">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <PropertyContent />
      </Suspense>
      <Footer />
    </div>
  );
}
