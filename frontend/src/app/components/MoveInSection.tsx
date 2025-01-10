import { FaDoorOpen } from 'react-icons/fa';

export default function MoveInSection() {
    return (
      <div className="p-8 rounded-xl shadow-lg mx-5 mb-10 flex items-center" style={{
        backgroundColor: "var(--gray-bg)",
        color: "var(--cta-text)",
      }}>
        <FaDoorOpen className="text-5xl text-purple-400 mr-6" />
        <div>
          <h3 className="text-2xl font-semibold" style={{
        color: "var(--copy-primary)",
      }}>Instant Move-In</h3>
          <p className="mt-2" style={{
        color: "var(--copy-secondary)",
      }}>
            Say goodbye to lengthy waits. Find, finalize, and move into your dream home without any delay.
          </p>
        </div>
      </div>
    );
}
