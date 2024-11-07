import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Form = () => {
  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 flex flex-col items-center py-10 px-4">
      {/* Top Section: Property Owners Benefits */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">For Property Owners</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Rent your property for free</h2>
        <div className="flex justify-center space-x-8 mt-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500">1,00,000+</div>
            <p className="text-gray-600">House Rented</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500">2,00,000+</div>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500">45,000+</div>
            <p className="text-gray-600">Home Owners Trust Us</p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-white shadow-md rounded-lg p-8 mb-12 w-full max-w-3xl">
        <h3 className="text-xl font-bold text-center text-gray-800 mb-6">
          List your property for FREE in these 3 simple steps
        </h3>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="text-blue-500 font-bold text-lg">Step 1</div>
            <div className="ml-4">
              <h4 className="text-gray-700 font-semibold">Share your Property Details</h4>
              <p className="text-gray-500">Location, Photos, Videos & other details.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-blue-500 font-bold text-lg">Step 2</div>
            <div className="ml-4">
              <h4 className="text-gray-700 font-semibold">Set your Price & Choose your Plan</h4>
              <p className="text-gray-500">Quote your desired rent & select a plan.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-blue-500 font-bold text-lg">Step 3</div>
            <div className="ml-4">
              <h4 className="text-gray-700 font-semibold">Handover the Keys</h4>
              <p className="text-gray-500">Post property inspection, handover the keys.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Property Listing Form */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">List Your Property</h3>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name of the House Owner</label>
            <input
              type="text"
              placeholder="Name of the house owner"
              className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Property Type</label>
            <div className="flex space-x-4">
              <button type="button" className="px-5 py-2 border rounded-full text-gray-700 bg-gray-100">
                Apartment
              </button>
              <button type="button" className="px-5 py-2 border rounded-full text-blue-500 bg-blue-100">
                Individual
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Number of Bedrooms</label>
            <div className="flex space-x-4">
              {[1, 2, 3, "4+"].map((number) => (
                <button
                  key={number}
                  type="button"
                  className="px-4 py-2 border rounded-full text-gray-700 bg-gray-100"
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800"
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
