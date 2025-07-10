import React, { useContext, useState, useEffect } from "react";
import { FaEnvelope, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import Modal from "react-modal";
import SubscriptionCheckout from "../../Components/Payment/SubscriptionCheckout";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
Modal.setAppElement("#root");

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  //  Subscription status
  const [status, setStatus] = useState("Unsubscribed");
  const [showModal, setShowModal] = useState(false);

  //  Fetch subscription status from server when user loads
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/info?email=${user?.email}`);
        setStatus(res.data.subscription || "Unsubscribed");
      } catch (err) {
        console.error("Failed to fetch subscription status", err);
      }
    };

    if (user?.email) {
      fetchStatus();
    }
  }, [user?.email]);

  const handleSubscribe = () => setShowModal(true);
  const handlePaymentSuccess = () => {
    setStatus("Verified");
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 bg-gray-100 dark:bg-gray-900">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        My Profile
      </h1>

      {/* Profile Card */}
      <div className="w-full mx-auto max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 text-center">
        {/* Profile Image */}
        {user?.photoURL ? (
          <img
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
            src={user.photoURL}
            alt="User"
          />
        ) : (
          <FaUserCircle className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-500" />
        )}

        {/* Name */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
          {user?.displayName || "Unknown User"}
        </h2>

        {/* Email */}
        <p className="text-gray-600 dark:text-gray-300 flex justify-center items-center gap-2 mt-1">
          <FaEnvelope />
          {user?.email || "Not Provided"}
        </p>

        {/* Subscription Status */}
        <div className="mt-4">
          <span className="inline-block px-4 py-1 text-sm rounded-full font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            Status:{" "}
            <span
              className={`font-semibold ${
                status === "Verified" ? "text-green-600" : "text-red-500"
              }`}
            >
              {status}
            </span>
          </span>
        </div>

        {/* Add Subscription Button */}
        <button
          onClick={handleSubscribe}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-300"
        >
          Subscription $100
        </button>
      </div>

      {/* Stripe Checkout Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg p-6 mx-auto mt-10 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      >
        <SubscriptionCheckout
          userEmail={user?.email}
          onSuccess={handlePaymentSuccess}
        />
      </Modal>
    </div>
  );
};

export default UserProfile;
