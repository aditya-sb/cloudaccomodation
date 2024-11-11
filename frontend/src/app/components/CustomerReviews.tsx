export default function CustomerReviews() {
    return (
      <section className="p-12 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-white mb-10">
            What Our Customers Say
          </h2>
          <div className="space-y-8">
            {/* Review 1 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300">
              <p className="text-xl font-light leading-relaxed text-gray-200 mb-4">
                I found my dream home with Luxury Properties. Highly recommend!
              </p>
              <p className="font-semibold text-gray-400">- Rajesh, Mumbai</p>
            </div>
  
            {/* Review 2 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300">
              <p className="text-xl font-light leading-relaxed text-gray-200 mb-4">
                Amazing service and premium listings. Very satisfied!
              </p>
              <p className="font-semibold text-gray-400">- Priya, Bangalore</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  