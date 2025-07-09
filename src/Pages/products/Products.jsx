import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { FaSearch, FaThumbsUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
const Products = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // State for search input & pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  // Fetch products with search & pagination parameters
  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["all-products", searchTerm, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products/all?search=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`
      );
      return res.data; 
    },
    keepPreviousData: true,
  });

  const products = data?.products || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  // Handle voting/upvoting product
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

  // Pagination controls
  const handlePrevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  return (
    <section className="py-10 px-4 md:px-10 bg-white dark:bg-gray-900 min-h-screen">
      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8 flex items-center border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 shadow">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search products by tags..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); // reset to first page on new search
          }}
          className="w-full bg-transparent focus:outline-none text-gray-700 dark:text-gray-200"
        />
      </div>

      {/* Loading or Error states */}
      {isLoading && <p className="text-center">Loading products...</p>}
      {isError && (
        <p className="text-center text-red-500">
          Failed to load products. Please try again.
        </p>
      )}

      {/* No products found message */}
      {!isLoading && products.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No products found matching your search.
        </p>
      )}

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {!isLoading &&
          products.map((product, i) => (
            <motion.div
              key={product._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col justify-between"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-40 object-cover rounded mb-3 transition-transform duration-300 ease-in-out hover:scale-105"
              />

              <Link
                to={`/product/${product._id}`}
                className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {product.productName}
              </Link>

              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-1 my-2">
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
                className={`flex items-center justify-center gap-2 px-3 py-1 mt-3 text-sm rounded-full font-medium transition duration-300
                ${
                  user?.email === product.ownerEmail ||
                  product.voters?.includes(user?.email)
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <FaThumbsUp /> {product.votes || 0}
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">
                Published on: {new Date(product.timestamp).toLocaleDateString()}{" "}
                at{" "}
                {new Date(product.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </motion.div>
          ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-gray-400 cursor-pointer"
        >
          <GrLinkPrevious />
        </button>
        <span className="text-white">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages || totalPages === 0}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-gray-400 cursor-pointer"
        >
          <GrLinkNext />
        </button>
      </div>
    </section>
  );
};

export default Products;
