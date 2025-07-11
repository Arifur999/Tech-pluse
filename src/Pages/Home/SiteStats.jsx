import React from "react";
import { FaUsers, FaBoxOpen, FaStar, FaUserCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const SiteStats = () => {
  const stats = [
    {
      icon: <FaUsers className="text-4xl text-blue-400" />,
      label: "Total Users",
      value: 1250,
    },
    {
      icon: <FaBoxOpen className="text-4xl text-green-400" />,
      label: "Total Products",
      value: 860,
    },
    {
      icon: <FaStar className="text-4xl text-yellow-400" />,
      label: "Total Reviews",
      value: 1423,
    },
    {
      icon: <FaUserCheck className="text-4xl text-purple-400" />,
      label: "Subscribed Users",
      value: 312,
    },
  ];

  return (
    <div className="bg-gray-900 py-12 px-4">
      <h2 className="text-3xl font-bold text-white mb-10 text-center">
        Platform Statistics
      </h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-800 rounded-lg p-6 text-center shadow-lg"
          >
            <div className="mb-3 flex justify-center">{stat.icon}</div>
            <h3 className="text-white text-lg font-semibold">{stat.label}</h3>
            <p className="text-3xl font-bold text-green-300 mt-2">
              <CountUp end={stat.value} duration={8} separator="," />
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SiteStats;
