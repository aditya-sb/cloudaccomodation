import { FaDoorOpen } from 'react-icons/fa';

export default function MoveInSection() {
    return (
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-xl shadow-lg mx-5 mb-10 flex items-center transition transform hover:shadow-2xl">
        <FaDoorOpen className="text-5xl text-purple-400 mr-6" />
        <div>
          <h3 className="text-2xl font-semibold text-white">Instant Move-In</h3>
          <p className="text-gray-400 mt-2">
            Say goodbye to lengthy waits. Find, finalize, and move into your dream home without any delay.
          </p>
        </div>
      </div>
    );
}
