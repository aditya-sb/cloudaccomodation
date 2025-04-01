import React from 'react';
import { useRouter } from "next/navigation";

const OtherServices = () => {
  const router = useRouter();

  const services = [
    { icon: "/images/icons/Airport.png", name: "Student Flights" },
    { icon: "/images/icons/Airport2.png", name: "Airport Pickup" },
    { icon: "/images/icons/Shield.png", name: "Student Guarantor" },
    { icon: "/images/icons/Airport2.png", name: "Airport Pickup" },
    { icon: "/images/icons/StudentCenter.png", name: "Student Loans" },
    { icon: "/images/icons/Protect.png", name: "Tenant Insurance" },
    { icon: "/images/icons/Discount.png", name: "Deals" },
    { icon: "/images/icons/SimCard.png", name: "Overseas Sim Card" },
  ];

  return (
    <section className="p-8 mb-5" style={{ color: "var(--foreground)" }}>
      <div className="flex w-full justify-start mb-10">
        <h3 className="text-3xl max-sm:text-2xl mt-7 font-semibold text-center" 
            style={{ color: "var(--foreground)" }}>
          Other Services
        </h3>
      </div>

      {/* Desktop Grid / Mobile Slider Container */}
      <div className="max-w-4xl mx-auto">
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
          {services.map((service, index) => (
            <ServiceCard key={index} icon={service.icon} name={service.name} />
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden w-full overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 pb-4 min-w-min">
            {services.map((service, index) => (
              <div key={index} className="flex-shrink-0 w-[200px]">
                <ServiceCard icon={service.icon} name={service.name} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sign Up Banner */}
      <div className="max-w-4xl mx-auto mt-16 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-8 md:p-10 flex flex-col md:flex-row items-center justify-between">
            <div className="md:max-w-lg mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Create Your Account Today
              </h3>
              <p className="text-blue-100 text-sm md:text-base">
                Sign up to unlock exclusive features, save your favorite properties, and get personalized accommodation recommendations.
              </p>
            </div>
            <button 
              onClick={() => router.push('/auth/register')}
              className="py-3 px-8 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-md transform hover:scale-105 duration-200"
            >
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Separated ServiceCard component for reusability
const ServiceCard = ({ icon, name }) => (
  <div
    className="p-6 w-full h-full rounded-lg border-2 border-black/20 transform transition md:hover:-translate-y-2 duration-300 text-center"
    style={{ color: "var(--cta-text)" }}
  >
    <img
      src={icon}
      alt={name}
      className="w-100 h-100 mx-auto mb-4"
    />
    <p className="text-sm md:text-base text-black">
      {name}
    </p>
  </div>
);

export default OtherServices;