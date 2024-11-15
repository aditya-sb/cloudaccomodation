export default function CustomerReviews() {
    return (
      <section className="p-12 bg-gradient-to-r" style={{
        color: "var(--foreground)",
      }}>
        <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl mt-7 font-extrabold text-cente mb-10 text-center" style={{
          color: "var(--foreground)",
        }}> 
            What Our Customers Say
          </h2>
          <div className="space-y-8">
            {/* Review 1 */}
            <div className="p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300" style={{
          backgroundColor: "var(--border)",
          color: "var(--cta-text)",
        }}>
              <p className="text-xl font-light leading-relaxed mb-4" style={{
        color: "var(--copy-primary)",
      }}>
                I found my dream home with Luxury Properties. Highly recommend!
              </p>
              <p className="font-semibold" style={{
        color: "var(--copy-secondary)",
      }}>- Rajesh, Mumbai</p>
            </div>
  
            {/* Review 2 */}
            <div className=" p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 duration-300" style={{
          backgroundColor: "var(--border)",
          color: "var(--cta-text)",
        }}>
              <p className="text-xl font-light leading-relaxed mb-4" style={{
        color: "var(--copy-primary)",
      }}>
                Amazing service and premium listings. Very satisfied!
              </p>
              <p className="font-semibold" style={{
        color: "var(--copy-secondary)",
      }}>- Priya, Bangalore</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  