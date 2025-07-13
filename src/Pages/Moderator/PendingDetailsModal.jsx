import React from "react";
import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";

const PendingDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 pt-16 md:pt-3 lg:pt-3 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full p-6 relative shadow-lg">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>

        <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
          Product Details
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left - Image */}
          <div className="flex justify-center items-center">
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full max-w-xs rounded-lg shadow"
            />
          </div>

          {/* Right - Info */}
          <div className="text-gray-800 dark:text-gray-200 space-y-3">
            <p>
              <strong>Name:</strong> {product.productName}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-white ${
                  product.status === "pending"
                    ? "bg-yellow-500"
                    : product.status === "approved"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {product.status}
              </span>
            </p>
            <p>
              <strong>Featured:</strong>{" "}
              {product.featureProduct === "true" ? "Yes" : "No"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {product.description || "No description available"}
            </p>
            {product.externalLink && (
              <p>
                <strong>External Link:</strong>{" "}
                <a
                  href={product.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 inline-flex items-center gap-1"
                >
                  Visit <FaExternalLinkAlt size={12} />
                </a>
              </p>
            )}
            <p>
              <strong>Tags:</strong>{" "}
              {product.tags?.length
                ? product.tags.join(", ")
                : "No tags available"}
            </p>

            {/* Owner Info */}
            <div className="flex items-center gap-3 mt-4">
              <img
                src={product.ownerImage}
                alt={product.ownerName}
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <p className="font-medium">{product.ownerName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {product.ownerEmail}
                </p>
              </div>
            </div>

            {/* Timestamp */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Posted on:{" "}
              {new Date(product.timestamp).toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingDetailsModal;
