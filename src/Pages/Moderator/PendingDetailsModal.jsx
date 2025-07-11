import React from "react";
import { FaTimes } from "react-icons/fa";

const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6 relative shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>
        <h3 className="text-xl font-semibold mb-4 dark:text-gray-100">
          Product Details
        </h3>
        <div className="space-y-2 text-gray-800 dark:text-gray-200 max-h-[400px] overflow-y-auto">
          <p>
            <strong>Name:</strong> {product.productName}
          </p>
          <p>
            <strong>Status:</strong> {product.status}
          </p>
          <p>
            <strong>Featured:</strong> {product.featureProduct === "true" ? "Yes" : "No"}
          </p>
          <p>
            <strong>Description:</strong> {product.description || "No description available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
