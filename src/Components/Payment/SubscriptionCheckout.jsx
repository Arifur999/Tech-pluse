import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


const SubscriptionCheckout = ({ userEmail, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      //  Create Payment Intent from backend
      const { data } = await axios.post(`${API_URL}/create-payment-intent`, {
        email: userEmail,
        amount: 10000, 
      });

      const clientSecret = data.clientSecret;
      const card = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: { email: userEmail },
        },
      });

      if (error) {
        Swal.fire("Payment Failed", error.message, "error");
      } else if (paymentIntent.status === "succeeded") {
        //  Update user status in backend
        await axios.patch(`${API_URL}/api/user/update-subscription`, {
          email: userEmail,
          status: "Verified",
        });

        Swal.fire("Success!", "Subscription added successfully.", "success");
        onSuccess(); 
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-4 border rounded" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Processing..." : "Pay $100"}
      </button>
    </form>
  );
};

export default SubscriptionCheckout;
