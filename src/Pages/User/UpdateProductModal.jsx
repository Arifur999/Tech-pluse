import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const UpdateProductModal = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    tags: [],
    externalLink: "",
    status: product?.status || "pending",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName || "",
        description: product.description || "",
        tags: product.tags || [],
        externalLink: product.externalLink || "",
        status: product.status || "pending",
      });
    }
  }, [product]);
  console.log(product);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setFormData((prev) => ({
        ...prev,
        tags: value.split(",").map((tag) => tag.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-600"
          aria-label="Close modal"
          type="button"
        >
          <FaTimes size={22} />
        </button>

        {/* Product Image */}
        {product.productImage && (
          <div className="mb-6 flex justify-center">
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-40 h-40 object-cover rounded-md shadow-md"
            />
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-5 text-gray-900 dark:text-gray-100 text-center">
          Update Product
        </h2>

        {/* Owner Info - readonly */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
            Owner Name
          </label>
          <input
            type="text"
            value={product.ownerName || ""}
            readOnly
            className="w-full px-3 py-2 border rounded bg-gray-200 dark:bg-gray-700 cursor-not-allowed dark:text-gray-100"
            aria-readonly="true"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
            Owner Email
          </label>
          <input
            type="email"
            value={product.ownerEmail || ""}
            readOnly
            className="w-full px-3 py-2 border rounded bg-gray-200 dark:bg-gray-700 cursor-not-allowed dark:text-gray-100"
            aria-readonly="true"
          />
        </div>

        {/* Editable form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags.join(", ")}
              onChange={handleChange}
              placeholder="tag1, tag2, tag3"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              External Link (optional)
            </label>
            <input
              type="url"
              name="externalLink"
              value={formData.externalLink}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              disabled
              className="w-full px-3 py-2 border rounded bg-gray-200 dark:bg-gray-700 cursor-not-allowed dark:text-gray-100"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Update Product
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateProductModal;
