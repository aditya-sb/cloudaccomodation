
import Dropdown from "./Dropdown";
import { FaBolt, FaDollarSign, FaCheck, FaHeadset } from "react-icons/fa";

const Features = () => {
    return (
        <div className="rounded-lg overflow-hidden mt-4">
              <Dropdown
                className="border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                title="Instant Booking"
                icon={<FaBolt size={14} />}
              >
                <p>With Instant Booking, you can reserve your room in minutes — no waiting.</p>
              </Dropdown>
              <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="Lowest Price Guaranteed"
                icon={<FaDollarSign size={14} />}
              >
                <p>Our Lowest Price Guarantee means you’ll never overpay for rent.</p>
              </Dropdown>
              <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="Verified Properties"
                icon={<FaCheck size={14} />}
              >
                <p>All listings are Verified, so what you see is what you get — no scams or surprises.</p>
              </Dropdown>
              <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="24x7 Personal Assistance"
                icon={<FaHeadset size={14} />}
              >
                <p>With our 24/7 Assistance, you’ll always have someone to guide you, from booking to move-in.</p>
              </Dropdown>
              {/* <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="5.8K+ Reviews"
                icon={<FaUndo size={14} />}
              >
                <p>Details about reviews go here...</p>
              </Dropdown> */}
            </div>
    )
}

export default Features
