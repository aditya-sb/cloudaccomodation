import { FaMapMarkerAlt } from "react-icons/fa";

const Map = ({ location }: { location: string }) => (
  <div className="mt-10 bg-gray-800 p-8 rounded-lg shadow-lg flex justify-between items-center">
    <div className="text-white">
      <h3 className="text-xl font-semibold">Explore the Area</h3>
      <p className="mt-2">{location}</p>
    </div>
    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-all hover:bg-blue-700 flex items-center">
      <FaMapMarkerAlt className="mr-2" /> View on Map
    </button>
  </div>
);

export default Map;
