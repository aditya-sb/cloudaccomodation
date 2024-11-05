// src/app/components/BuyerReviews.tsx
export default function BuyerReviews() {
  return (
    <div className="bg-gray-900 p-8 rounded-xl shadow-2xl mb-10">
      <h2 className="text-3xl font-extrabold text-white mb-6">Buyer Reviews</h2>
      <div className="space-y-6">
        <div className="border-b border-gray-600 pb-4">
          <p className="text-lg text-gray-300 italic">
            This property was everything we dreamed of. The process was smooth and the house is fantastic!
          </p>
          <p className="text-sm text-gray-500 mt-2 font-semibold">- John Doe</p>
        </div>
        <div className="border-b border-gray-600 pb-4">
          <p className="text-lg text-gray-300 italic">
            A wonderful place to live with the family. Highly recommend.
          </p>
          <p className="text-sm text-gray-500 mt-2 font-semibold">- Jane Smith</p>
        </div>
      </div>
    </div>
  );
}
