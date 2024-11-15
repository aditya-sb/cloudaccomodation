import { FaMoneyBillWave } from 'react-icons/fa';

export default function SecurityDepositSection() {
    return (
      <div className="p-8 rounded-xl shadow-lg mx-5 mb-10 flex items-center transition transform hover:shadow-2xl" style={{
        backgroundColor: "var(--border)",
        color: "var(--cta-text)",
      }}>
        <FaMoneyBillWave className="text-5xl text-yellow-400 mr-6" />
        <div>
          <h3 className="text-2xl font-semibold" style={{
        color: "var(--copy-primary)",
      }}>Lowest Security Deposit</h3>
          <p className=" mt-2" style={{
        color: "var(--copy-secondary)",
      }}>
            Ease rental stress by paying a minimal security deposit. Understanding financial challenges, we aim for convenience, ensuring a smoother rental journey for you.
          </p>
        </div>
      </div>
    );
}
