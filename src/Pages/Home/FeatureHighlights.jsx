import React from "react";
import { FaRocket, FaShieldAlt, FaBolt, FaHeart } from "react-icons/fa";

import { motion } from "framer-motion";

const features = [
  {
    icon: <FaRocket className="text-4xl text-blue-400" />,
    title: "Fast Performance",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-green-400" />,
    title: "Secure & Safe",
  },
  {
    icon: <FaBolt className="text-4xl text-yellow-400" />,
    title: "Lightning Speed",
  },
  {
    icon: <FaHeart className="text-4xl text-red-400" />,
    title: "User Friendly",
  },
];

const FeatureHighlights = () => {
  return (
    <div className="bg-gray-900 py-12 px-4">
      <h2 className="text-3xl font-bold text-white mb-10 text-center">
         Why Choose Us?
      </h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-800 rounded-lg p-6 text-center shadow-md"
          >
            <div className="flex justify-center mb-3">{feature.icon}</div>
            <h3 className="text-white text-lg font-semibold">
              {feature.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;
