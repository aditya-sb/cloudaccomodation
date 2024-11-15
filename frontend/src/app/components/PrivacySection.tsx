import { FaLock } from 'react-icons/fa';

export default function PrivacySection() {
    return (
      <div className=" p-8 rounded-xl shadow-lg mx-5 mb-10 flex items-center transition transform hover:shadow-2xl" style={{
        backgroundColor: "var(--border)",
        color: "var(--cta-text)",
      }}>
        <FaLock className="text-5xl text-green-400 mr-6" />
        <div>
          <h3 className="text-2xl font-semibold" style={{
        color: "var(--copy-primary)",
      }}>Unmatched Privacy</h3>
          <p className="text-gray-400 mt-2" style={{
        color: "var(--copy-secondary)",
      }}>
            We re committed to protecting your privacy. Throughout your rental journey, we ll be there for you every step of the way.
          </p>
        </div>
      </div>
    );
}
