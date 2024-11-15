import React from "react";

const Form = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--copy-primary)] flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Section: Property Owners Benefits */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[var(--cta)] mb-4">For Property Owners</h1>
        <h2 className="text-2xl font-semibold text-[var(--copy-secondary)]">Rent your property for free</h2>
        <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-8 mt-6">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-[var(--cta)]">1,00,000+</div>
            <p className="text-[var(--gray-text)]">House Rented</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-[var(--cta)]">2,00,000+</div>
            <p className="text-[var(--gray-text)]">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-[var(--cta)]">45,000+</div>
            <p className="text-[var(--gray-text)]">Home Owners Trust Us</p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-[var(--card)] shadow-md rounded-lg p-6 sm:p-8 mb-12 w-full max-w-lg sm:max-w-3xl">
        <h3 className="text-lg sm:text-xl font-bold text-center text-[var(--copy-primary)] mb-4 sm:mb-6">
          List your property for FREE in these 3 simple steps
        </h3>
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-start">
            <div className="text-[var(--cta)] font-bold text-lg">Step 1</div>
            <div className="ml-3 sm:ml-4">
              <h4 className="text-[var(--copy-secondary)] font-semibold">Share your Property Details</h4>
              <p className="text-[var(--gray-text)]">Location, Photos, Videos & other details.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-[var(--cta)] font-bold text-lg">Step 2</div>
            <div className="ml-3 sm:ml-4">
              <h4 className="text-[var(--copy-secondary)] font-semibold">Set your Price & Choose your Plan</h4>
              <p className="text-[var(--gray-text)]">Quote your desired rent & select a plan.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-[var(--cta)] font-bold text-lg">Step 3</div>
            <div className="ml-3 sm:ml-4">
              <h4 className="text-[var(--copy-secondary)] font-semibold">Handover the Keys</h4>
              <p className="text-[var(--gray-text)]">Post property inspection, handover the keys.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Property Listing Form */}
      <div className="bg-[var(--card)] shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-lg sm:max-w-3xl">
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--copy-primary)] mb-4 sm:mb-6 text-center">List Your Property</h3>
        <form className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-[var(--copy-secondary)] font-medium mb-1 sm:mb-2">Name of the House Owner</label>
            <input
              type="text"
              placeholder="Name of the house owner"
              className="w-full px-4 py-2 sm:py-3 border-[var(--input-border)] bg-[var(--input-bg)] rounded-lg text-[var(--copy-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--cta)]"
            />
          </div>
          <div>
            <label className="block text-[var(--copy-secondary)] font-medium mb-1 sm:mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 sm:py-3 border-[var(--input-border)] bg-[var(--input-bg)] rounded-lg text-[var(--copy-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--cta)]"
            />
          </div>
          <div>
            <label className="block text-[var(--copy-secondary)] font-medium mb-1 sm:mb-2">Property Type</label>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="px-4 sm:px-5 py-2 border-[var(--input-border)] rounded-full text-[var(--copy-primary)] bg-[var(--input-bg)]">
                Apartment
              </button>
              <button type="button" className="px-4 sm:px-5 py-2 border-[var(--input-border)] rounded-full text-[var(--copy-primary)] bg-[var(--hover-color)]">
                Individual
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[var(--copy-secondary)] font-medium mb-1 sm:mb-2">Number of Bedrooms</label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, "4+"].map((number) => (
                <button
                  key={number}
                  type="button"
                  className="px-4 py-2 border-[var(--input-border)] rounded-full text-[var(--copy-primary)] bg-[var(--input-bg)]"
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 sm:py-3 bg-gradient-to-r from-[var(--cta)] to-[var(--cta-active)] text-[var(--cta-text)] font-semibold rounded-full shadow-lg hover:from-[var(--hover-color)] hover:to-[var(--cta-active)]"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
