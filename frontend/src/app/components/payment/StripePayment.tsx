"use client";
import { useState, useEffect } from "react";
import styles from "./StripePayment.module.css";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCreatePaymentIntentMutation, useConfirmPaymentMutation, useCreateBookingMutation } from "../../redux/slices/apiSlice";
import { FaLock, FaCreditCard, FaSpinner, FaTimes } from "react-icons/fa";

// Initialize Stripe with your publishable key
const publishableKey ="pk_test_51P06F6SEv7tGBWvINM9jF7BxepuDLWSY0ejJp618S5pGOj1CdLCbcOlzOZq8N41PO0zzgAVeSRttSl4WlEKD2IyL00uhJdKVEW";
console.log("Stripe Publishable Key:", publishableKey); // Log the key for debugging

// Check if the key is valid
let isValidKey = true;
let keyError = "";

// Make sure we have a valid key
if (!publishableKey) {
  console.error("Stripe publishable key is missing. Please check your environment variables.");
  isValidKey = false;
  keyError = "Stripe publishable key is missing";
} else if (publishableKey === "REPLACE_WITH_YOUR_ACTUAL_STRIPE_PUBLISHABLE_KEY") {
  console.error("Stripe publishable key is still set to the placeholder value. Please replace it with your actual key.");
  isValidKey = false;
  keyError = "Stripe publishable key is set to a placeholder value";
} else if (!publishableKey.startsWith('pk_')) {
  console.error("Invalid Stripe publishable key format. The key should start with 'pk_'");
  isValidKey = false;
  keyError = "Invalid Stripe publishable key format";
}

const stripePromise = isValidKey ? loadStripe(publishableKey) : null;

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      },
      ':-webkit-autofill': {
        color: '#32325d'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  rentalDays: number;
  moveInMonth: string;
  propertyId: string;
  price: number;
}

interface StripePaymentProps {
  bookingDetails: BookingDetails;
  onSuccess: () => void;
  onError: (message: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose, children }) => {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-50"
          aria-label="Close modal"
        >
          <FaTimes className="w-5 h-5 text-gray-500" />
        </button>
        <div className={styles.container}>
          {children}
        </div>
      </div>
    </div>
  );
};

// The checkout form component
const CheckoutForm = ({ 
  bookingDetails, 
  onSuccess, 
  onError,
  onClose
}: { 
  bookingDetails: BookingDetails;
  onSuccess: () => void; 
  onError: (message: string) => void; 
  onClose: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // API hooks
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [createBooking] = useCreateBookingMutation();

  useEffect(() => {
    const getPaymentIntent = async () => {
      try {
        const response = await createPaymentIntent({ 
          bookingDetails // Pass complete booking details
        }).unwrap();
        setClientSecret(response.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        setError("Failed to initialize payment. Please try again.");
      }
    };

    if (bookingDetails.propertyId) {
      getPaymentIntent();
    }
  }, [bookingDetails, createPaymentIntent]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      // Use test card for India: 4000003560000008
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            // Use test data
            name: "Test User",
            email: "test@example.com",
            address: {
              country: 'US', // Use US instead of IN for testing
              postal_code: '12345'
            }
          }
        }
      });

      if (stripeError) {
        console.error('Payment Error:', stripeError);
        setError(stripeError.message || "Payment failed");
        onError(stripeError.message || "Payment failed");
      } else if (paymentIntent.status === "succeeded") {
        onSuccess();
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      setError("An unexpected error occurred. Please try again.");
      onError("An unexpected error occurred. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Complete Payment</h2>
        <p className="text-sm text-gray-600 mt-1">Enter your payment details to secure your booking</p>
      </div>

      {/* Booking Summary Card */}
      <div className="bg-gray-50 rounded-lg p-3 mb-5">
        <h3 className="text-xs font-medium text-gray-700 mb-2">Booking Summary</h3>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">{bookingDetails.rentalDays} days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Move-in</span>
            <span className="font-medium">{bookingDetails.moveInMonth}</span>
          </div>
          <div className="border-t mt-2 pt-2 flex justify-between items-center">
            <span className="text-sm text-gray-800">Total Amount</span>
            <span className="text-lg font-semibold text-blue-600">
              ${bookingDetails.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-700">Card Information</label>
          <div className={styles.cardWrapper}>
            <CardElement options={{
              ...CARD_ELEMENT_OPTIONS,
              style: {
                ...CARD_ELEMENT_OPTIONS.style,
                base: {
                  ...CARD_ELEMENT_OPTIONS.style.base,
                  fontSize: '14px',
                }
              }
            }} />
          </div>
        </div>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={processing || !stripe}
          className={styles.submitBtn}
        >
          <FaLock className="h-4 w-4" />
          <span>
            {processing ? 'Processing...' : `Pay $${bookingDetails.price.toLocaleString()}`}
          </span>
        </button>
      </form>

      {/* Security Badge */}
      <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
        <FaLock className="h-3 w-3 mr-1.5" />
        <span>Secure payment powered by Stripe</span>
      </div>
    </div>
  );
};

// The main Stripe payment component
const StripePayment: React.FC<StripePaymentProps> = ({ 
  bookingDetails,
  onSuccess, 
  onError,
  isOpen,
  onClose
}) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentModal isOpen={isOpen} onClose={onClose}>
        <CheckoutForm 
          bookingDetails={bookingDetails}
          onSuccess={onSuccess}
          onError={onError}
          onClose={onClose}
        />
      </PaymentModal>
    </Elements>
  );
};

export default StripePayment;