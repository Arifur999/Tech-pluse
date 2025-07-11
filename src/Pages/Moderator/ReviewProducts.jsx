import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle, FaStar } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ProductDetailsModal from "./ProductDetailsModal"; // Import here

const ReviewProducts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["review-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/all");
      return res.data.products.sort((a, b) => {
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (a.status !== "pending" && b.status === "pending") return 1;
        return 0;
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ productId, newStatus }) => {
      const updatePayload = { date: new Date() };

      if (newStatus === "approved") {
        updatePayload.status = "approved";
        updatePayload.featureProduct = "false";
      } else if (newStatus === "featured") {
        updatePayload.status = "approved";
        updatePayload.featureProduct = "true";
      } else if (newStatus === "rejected") {
        updatePayload.status = "rejected";
        updatePayload.featureProduct = "false";
      }

      const res = await axiosSecure.patch(
        `/products/${productId}/status`,
        updatePayload
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["review-products"]);
    },
  });

  const handleStatusChange = (id, status) => {
    const currentProduct = products.find((p) => p._id === id);

    if (status === "featured" && currentProduct.status !== "approved") {
      Swal.fire({
        title: "You need to accept first before featuring",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Accept and Feature",
      }).then((result) => {
        if (result.isConfirmed) {
          updateStatusMutation.mutate({
            productId: id,
            newStatus: "featured",
          });
          Swal.fire("Updated!", "Product accepted and featured.", "success");
        }
      });
      return;
    }

    Swal.fire({
      title: `Are you sure to ${status}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ productId: id, newStatus: status });
        Swal.fire("Updated!", `Product has been ${status}.`, "success");
      }
    });
  };

  // Modal open function
  const openModal = (product) => {
    setModalProduct(product);
    setModalOpen(true);
  };

  // Modal close function
  const closeModal = () => {
    setModalOpen(false);
    setModalProduct(null);
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Product Review Queue
      </h2>

      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
        <table className="min-w-[800px] w-full table-auto border border-gray-300 dark:border-gray-600 rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-200">#</th>
              <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-200">Product Name</th>
              <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-200">Details</th>
              <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const isPending = product.status === "pending";
              const isApproved = product.status === "approved";
              const isRejected = product.status === "rejected";
              const isFeatured = product.featureProduct === "true";

              return (
                <tr
                  key={product._id}
                  className={`${
                    isRejected ? "opacity-30 blur-sm" : ""
                  } hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200`}
                >
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{index + 1}</td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{product.productName}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openModal(product)}
                      className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
                    >
                      Details
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
                      <button
                        disabled={!isApproved || isFeatured}
                        onClick={() => handleStatusChange(product._id, "featured")}
                        className={`px-3 py-1 rounded flex items-center gap-1 text-sm ${
                          !isApproved || isFeatured
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-yellow-500 text-white hover:bg-yellow-600"
                        }`}
                      >
                        <FaStar /> Feature
                      </button>

                      <button
                        disabled={isApproved || isRejected}
                        onClick={() => handleStatusChange(product._id, "approved")}
                        className={`px-3 py-1 rounded flex items-center gap-1 text-sm ${
                          isApproved || isRejected
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        <FaCheckCircle /> Accept
                      </button>

                      <button
                        disabled={isRejected || isApproved}
                        onClick={() => handleStatusChange(product._id, "rejected")}
                        className={`px-3 py-1 rounded flex items-center gap-1 text-sm ${
                          isRejected || isApproved
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <ProductDetailsModal product={modalProduct} onClose={closeModal} />
      )}
    </div>
  );
};

export default ReviewProducts;
