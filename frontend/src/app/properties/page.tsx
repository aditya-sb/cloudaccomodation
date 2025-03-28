"use client";

import { Suspense } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertyContent from "./PropertyContent";

export default function PropertyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b" style={{
      backgroundColor: "var(--background)",
      color: "var(--foreground)",
    }}>
      <Header isPropertyPage={false} />
      <Suspense fallback={<div></div>}>
        <PropertyContent />
      </Suspense>
      <Footer />
    </div>
  );
}
