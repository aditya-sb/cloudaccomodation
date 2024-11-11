import { FaNetworkWired } from 'react-icons/fa';

export default function NestNetworkSection() {
    return (
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-xl shadow-lg mx-5 mb-10 flex items-center transition transform hover:shadow-2xl">
        <FaNetworkWired className="text-5xl text-indigo-400 mr-6" />
        <div>
          <h3 className="text-2xl font-semibold text-white">Nest n Network</h3>
          <p className="text-gray-400 mt-2">
            From shared spaces to curated events, we foster a space where you re not just renting a home but building the future.
          </p>
        </div>
      </div>
    );
}
