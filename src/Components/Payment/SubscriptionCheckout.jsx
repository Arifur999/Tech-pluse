import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;



const SubscriptionCheckout = ({ userEmail, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [originalAmount] = useState(10000); // $100 in cents
  const [finalAmount, setFinalAmount] = useState(originalAmount);
  const [couponMessage, setCouponMessage] = useState("");

  // ⏳ Live coupon validation and amount update
  useEffect(() => {
    const verifyCoupon = async () => {
      if (!couponCode) {
        setFinalAmount(originalAmount);
        setCouponMessage("");
        return;
      }

      try {
        const res = await axios.post(`${API_URL}/coupons/verify`, {
          code: couponCode,
        });
        const { discount, description } = res.data;
        const discountedAmount = Math.round(originalAmount - (originalAmount * discount / 100));
        setFinalAmount(discountedAmount);
        setCouponMessage(`✅ ${discount}% off applied - ${description}`);
      } catch (err) {
        setFinalAmount(originalAmount);
        setCouponMessage("❌ Invalid or expired coupon");
      }
    };

    verifyCoupon();
  }, [couponCode, originalAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create Payment Intent
      const { data } = await axios.post(`${API_URL}/create-payment-intent`, {
        email: userEmail,
        amount: finalAmount,
      });

      const clientSecret = data.clientSecret;
      const card = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
            billing_details: { email: userEmail },
          },
        }
      );

      if (error) {
        Swal.fire("Payment Failed", error.message, "error");
      } else if (paymentIntent.status === "succeeded") {
        // Update subscription status
        await axios.patch(`${API_URL}/api/user/update-subscription`, {
          email: userEmail,
          status: "Verified",
        });

        Swal.fire("Success!", "Subscription added successfully.", "success");
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-2">Subscribe Now</h2>

      <input
        type="text"
        placeholder="Enter coupon code (optional)"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        className="input input-bordered w-full text-black"
      />
      {couponMessage && (
        <p className={`text-sm ${couponMessage.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
          {couponMessage}
        </p>
      )}

      <CardElement className="p-4 border border-gray-600 bg-white rounded text-black" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Processing..." : `Pay $${(finalAmount / 100).toFixed(2)}`}
      </button>
    </form>
  );
};

export default SubscriptionCheckout;

