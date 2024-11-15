import { FaNetworkWired } from 'react-icons/fa';

export default function NestNetworkSection() {
    return (
      <div className=" p-8 rounded-xl shadow-lg mx-5 mb-10 flex items-center transition transform hover:shadow-2xl" style={{
        backgroundColor: "var(--border)",
        color: "var(--cta-text)",
      }}>
        <FaNetworkWired className="text-5xl text-indigo-400 mr-6" />
        <div>
          <h3 className="text-2xl font-semibold" style={{
        color: "var(--copy-primary)",
      }}>Nest n Network</h3>
          <p className=" mt-2"style={{
        color: "var(--copy-secondary)",
      }}>
            From shared spaces to curated events, we foster a space where you re not just renting a home but building the future.
          </p>
        </div>
      </div>
    );
}
