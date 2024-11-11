import { FaMoneyBillWave } from 'react-icons/fa';

export default function SecurityDepositSection() {
    return (
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-xl shadow-lg mx-5 mb-10 flex items-center transition transform hover:shadow-2xl">
        <FaMoneyBillWave className="text-5xl text-yellow-400 mr-6" />
        <div>
          <h3 className="text-2xl font-semibold text-white">Lowest Security Deposit</h3>
          <p className="text-gray-400 mt-2">
            Ease rental stress by paying a minimal security deposit. Understanding financial challenges, we aim for convenience, ensuring a smoother rental journey for you.
          </p>
        </div>
      </div>
    );
}
