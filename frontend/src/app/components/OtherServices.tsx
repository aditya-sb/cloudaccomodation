import { FaPlane, FaBox, FaUserShield, FaUniversity, FaCar, FaShieldAlt, FaTag, FaSimCard } from "react-icons/fa";

export default function OtherServices() {
  return (
    <section className="p-6 md:p-12 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-6 md:mb-10">
          Other Services
        </h2>
        <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
          
          {/* Service 1 */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center">
            <FaPlane className="text-yellow-500 text-3xl md:text-4xl mb-4 mx-auto" />
            <p className="text-lg md:text-xl font-semibold text-gray-200 mb-2">Flight Booking</p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition w-full sm:w-auto text-sm md:text-base">
              Coming Soon
            </button>
          </div>

          {/* Service 2 */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center">
            <FaBox className="text-yellow-500 text-3xl md:text-4xl mb-4 mx-auto" />
            <p className="text-lg md:text-xl font-semibold text-gray-200 mb-2">Nearby Tiffin</p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition w-full sm:w-auto text-sm md:text-base">
              Coming Soon
            </button>
          </div>

          {/* Service 3 */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center">
            <FaUserShield className="text-yellow-500 text-3xl md:text-4xl mb-4 mx-auto" />
            <p className="text-lg md:text-xl font-semibold text-gray-200 mb-2">Student Guarantor</p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition w-full sm:w-auto text-sm md:text-base">
              Coming Soon
            </button>
          </div>

          {/* Service 4 */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center">
            <FaUniversity className="text-yellow-500 text-3xl md:text-4xl mb-4 mx-auto" />
            <p className="text-lg md:text-xl font-semibold text-gray-200 mb-2">Student Loan</p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition w-full sm:w-auto text-sm md:text-base">
              Coming Soon
            </button>
          </div>

          {/* Service 5 */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center">
            <FaCar className="text-yellow-500 text-3xl md:text-4xl mb-4 mx-auto" />
            <p className="text-lg md:text-xl font-semibold text-gray-200 mb-2">Airport Pickup</p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition w-full sm:w-auto text-sm md:text-base">
              Coming Soon
            </button>
          </div>

          {/* Service 6 */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center">
            <FaShieldAlt className="text-yellow-500 text-3xl md:text-4xl mb-4 mx-auto" />
            <p className="text-lg md:text-xl font-semibold text-gray-200 mb-2">Tenant Insurance</p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition w-full sm:w-auto text-sm md:text-base">
              Coming Soon
            </button>
          </div>

          {/* Service 7 */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center">
            <FaTag className="text-yellow-500 text-3xl md:text-4xl mb-4 mx-auto" />
            <p className="text-lg md:text-xl font-semibold text-gray-200 mb-2">Deals</p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition w-full sm:w-auto text-sm md:text-base">
              Coming Soon
            </button>
          </div>

          {/* Service 8 */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center">
            <FaSimCard className="text-yellow-500 text-3xl md:text-4xl mb-4 mx-auto" />
            <p className="text-lg md:text-xl font-semibold text-gray-200 mb-2">Overseas Sim Card</p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition w-full sm:w-auto text-sm md:text-base">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
