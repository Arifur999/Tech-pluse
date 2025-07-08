import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { FaFireAlt, FaThumbsUp } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/AuthContext";

const TrendingProducts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: trending = [], refetch } = useQuery({
  queryKey: ["trending-products"],
  queryFn: async () => {
    const res = await axiosSecure.get("/products/trending");
    return res.data; 
  },
});

  const handleVote = async (product) => {
    if (!user) return navigate("/login");
    if (user?.email === product.ownerEmail) return;

    try {
      const res = await axiosSecure.put(`/products/upvote/${product._id}`, {
        voter: user.email,
      });
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    } catch (error) {
      console.error("Vote error:", error);
    }
  };

  return (
    <section className="py-12 px-4 md:px-10 bg-white dark:bg-gray-900">
      {/* Section Heading */}
      <motion.h2
        className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaFireAlt className="inline text-orange-500 mr-2" /> Trending Products
      </motion.h2>

      {/* Subheading */}
      <motion.p
        className="text-center text-gray-600 dark:text-gray-300 text-sm md:text-base mb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Check out the hottest tech products, ranked by community votes!
      </motion.p>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trending.map((product, i) => (
          <motion.div
            key={product._id}
            className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-5 flex flex-col justify-between
              border-2 border-transparent hover:border-gradient-animation cursor-pointer transition-all"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <motion.img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-44 object-cover rounded mb-4 transition-transform duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
            />

            <Link
              to={`/product/${product._id}`}
              className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {product.productName}
            </Link>

            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2 my-3">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => handleVote(product)}
              disabled={
                user?.email === product.ownerEmail ||
                product.voters?.includes(user?.email)
              }
              className={`flex items-center justify-center gap-2 px-4 py-1 mt-auto text-sm rounded-full font-medium transition duration-300
                ${
                  user?.email === product.ownerEmail ||
                  product.voters?.includes(user?.email)
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
            >
              <FaThumbsUp /> {product.votes || 0}
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">
              Published on: {new Date(product.timestamp).toLocaleDateString()} at{" "}
              {new Date(product.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Show All Products Button */}
      <div className="flex justify-center mt-12">
        <Link
          to="/products"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition"
        >
          Show All Products
        </Link>
      </div>
    </section>
  );
};

export default TrendingProducts;
