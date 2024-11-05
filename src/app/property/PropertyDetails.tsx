// src/app/components/PropertyDetails.tsx
interface PropertyDetailsProps {
  title: string;
  location: string;
  price: string;
  description: string;
  features: string[];
}

export default function PropertyDetails({
  title,
  location,
  price,
  description,
  features,
}: PropertyDetailsProps) {
  return (
    <div className="bg-gray-900 p-8 rounded-xl shadow-2xl mb-10">
      <h1 className="text-4xl font-extrabold text-white mb-6">{title}</h1>
      <p className="text-lg text-gray-400 mb-4">
        📍 <span className="font-semibold">{location}</span>
      </p>
      <p className="text-3xl font-bold text-yellow-400 mb-8">{price}</p>
      <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="font-medium">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
