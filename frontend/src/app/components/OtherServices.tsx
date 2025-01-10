import { FaPlane, FaBox, FaUserShield, FaUniversity, FaCar, FaShieldAlt, FaTag, FaSimCard } from "react-icons/fa";

export default function OtherServices() {
  return (
    <section className="p-6 dark-mode:bg-gray-900 md:p-12" style={{
      color: "var(--foreground)",
      backgroundColor: "var(--border)",
    }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl mt-7 font-extrabold text-center mb-10" style={{
          color: "var(--foreground)",
        }}>
          Other Services
        </h2>
        <div className="grid grid-cols-2 gap-4 md:gap-10  md:grid-cols-3 lg:grid-cols-4">
          
          {/* Service 1 */}
          <div className="p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center" style={{
            backgroundColor: "var(--gray-bg)",
            color: "var(--cta-text)",
          }}>
            <FaPlane className="text-purple-600 text-3xl sm:text-4xl mb-4 mx-auto" />
            <p className="text-sm sm:text-lg md:text-xl font-semibold text-purple-600 mb-2">Flight Booking</p>
            <button
              className="mt-4 py-2 px-4 rounded-lg shadow-md transition hover:opacity-75"
              style={{
                background: "linear-gradient(to right, var(--cta), var(--cta-active))",
                color: "var(--cta-text)",
              }}
            >
              Coming Soon
            </button>
          </div>

          {/* Service 2 */}
          <div className="p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center" style={{
            backgroundColor: "var(--gray-bg)",
            color: "var(--cta-text)",
          }}>
            <FaBox className="text-indigo-600 text-3xl sm:text-4xl mb-4 mx-auto" />
            <p className="text-sm sm:text-lg md:text-xl font-semibold text-indigo-600 mb-2">Nearby Tiffin</p>
            <button
              className="mt-4 py-2 px-4 rounded-lg shadow-md transition hover:opacity-75"
              style={{
                background: "linear-gradient(to right, var(--cta), var(--cta-active))",
                color: "var(--cta-text)",
              }}
            >
              Coming Soon
            </button>
          </div>

          {/* Service 3 */}
          <div className="p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center" style={{
            backgroundColor: "var(--gray-bg)",
            color: "var(--cta-text)",
          }}>
            <FaUserShield className="text-green-600 text-3xl sm:text-4xl mb-4 mx-auto" />
            <p className="text-sm sm:text-lg md:text-xl font-semibold text-green-600 mb-2">Student Guarantor</p>
            <button
              className="mt-4 py-2 px-4 rounded-lg shadow-md transition hover:opacity-75"
              style={{
                background: "linear-gradient(to right, var(--cta), var(--cta-active))",
                color: "var(--cta-text)",
              }}
            >
              Coming Soon
            </button>
          </div>

          {/* Service 4 */}
          <div className="p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center" style={{
            backgroundColor: "var(--gray-bg)",
            color: "var(--cta-text)",
          }}>
            <FaUniversity className="text-yellow-500 text-3xl sm:text-4xl mb-4 mx-auto" />
            <p className="text-sm sm:text-lg md:text-xl font-semibold text-yellow-500 mb-2">Student Loan</p>
            <button
              className="mt-4 py-2 px-4 rounded-lg shadow-md transition hover:opacity-75"
              style={{
                background: "linear-gradient(to right, var(--cta), var(--cta-active))",
                color: "var(--cta-text)",
              }}
            >
              Coming Soon
            </button>
          </div>

          {/* Service 5 */}
          <div className="p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center" style={{
            backgroundColor: "var(--gray-bg)",
            color: "var(--cta-text)",
          }}>
            <FaCar className="text-yellow-500 text-3xl sm:text-4xl mb-4 mx-auto" />
            <p className="text-sm sm:text-lg md:text-xl font-semibold text-yellow-500 mb-2">Airport Pickup</p>
            <button
              className="mt-4 py-2 px-4 rounded-lg shadow-md transition hover:opacity-75"
              style={{
                background: "linear-gradient(to right, var(--cta), var(--cta-active))",
                color: "var(--cta-text)",
              }}
            >
              Coming Soon
            </button>
          </div>

          {/* Service 6 */}
          <div className="p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center" style={{
            backgroundColor: "var(--gray-bg)",
            color: "var(--cta-text)",
          }}>
            <FaShieldAlt className="text-green-600 text-3xl sm:text-4xl mb-4 mx-auto" />
            <p className="text-sm sm:text-lg md:text-xl font-semibold text-green-600 mb-2">Tenant Insurance</p>
            <button
              className="mt-4 py-2 px-4 rounded-lg shadow-md transition hover:opacity-75"
              style={{
                background: "linear-gradient(to right, var(--cta), var(--cta-active))",
                color: "var(--cta-text)",
              }}
            >
              Coming Soon
            </button>
          </div>

          {/* Service 7 */}
          <div className="p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center" style={{
            backgroundColor: "var(--gray-bg)",
            color: "var(--cta-text)",
          }}>
            <FaTag className="text-indigo-600 text-3xl sm:text-4xl mb-4 mx-auto" />
            <p className="text-sm sm:text-lg md:text-xl font-semibold text-indigo-600 mb-2">Deals</p>
            <button
              className="mt-4 py-2 px-4 rounded-lg shadow-md transition hover:opacity-75"
              style={{
                background: "linear-gradient(to right, var(--cta), var(--cta-active))",
                color: "var(--cta-text)",
              }}
            >
              Coming Soon
            </button>
          </div>

          {/* Service 8 */}
          <div className="p-4 md:p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300 text-center" style={{
            backgroundColor: "var(--gray-bg)",
            color: "var(--cta-text)",
          }}>
            <FaSimCard className="text-purple-600 text-3xl sm:text-4xl mb-4 mx-auto" />
            <p className="text-sm sm:text-lg md:text-xl font-semibold text-purple-600 mb-2">Overseas Sim Card</p>
            <button
              className="mt-4 py-2 px-4 rounded-lg shadow-md transition hover:opacity-75"
              style={{
                background: "linear-gradient(to right, var(--cta), var(--cta-active))",
                color: "var(--cta-text)",
              }}
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
