import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaCheckCircle, FaTimesCircle, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ReviewProducts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["review-products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/all`);
      return res.data.products.sort((a, b) => {
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (a.status !== "pending" && b.status === "pending") return 1;
        return 0;
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ productId, newStatus }) => {
      const res = await axiosSecure.patch(`/products/${productId}/status`, {
        status: newStatus,
        updatedAt: new Date(),
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["review-products"]);
    },
  });

  const handleStatusChange = (id, status) => {
    Swal.fire({
      title: `Are you sure you want to ${status} this product?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "rejected" ? "#d33" : "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: `Yes, ${status} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ productId: id, newStatus: status });
        Swal.fire("Success!", `Product has been ${status}ed.`, "success");
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 w-full overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-200">
        Product Review Queue
      </h2>

      <table className="min-w-full w-full table-auto border-collapse border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="py-3 px-6 text-left text-gray-900 dark:text-gray-200">#</th>
            <th className="py-3 px-6 text-left text-gray-900 dark:text-gray-200">Product Name</th>
            <th className="py-3 px-6 text-left text-gray-900 dark:text-gray-200">Details</th>
            <th className="py-3 px-6 text-left text-gray-900 dark:text-gray-200">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr
              key={product._id}
              className={`border-b dark:border-gray-700 ${
                product.status === "rejected"
                  ? "blur-sm opacity-60 pointer-events-none"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <td className="py-3 px-6 text-gray-900 dark:text-gray-300">{index + 1}</td>

              <td className="py-3 px-6 text-gray-900 dark:text-gray-300">
                {product.productName}
              </td>

              <td className="py-3 px-6">
                {product.status === "pending" ? (
                  <Link
                    to={`/products/${product._id}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {product.productName}
                  </Link>
                ) : (
                  <span className="text-gray-400 italic">Not Available</span>
                )}
              </td>

              <td className="py-3 px-6 space-x-2 flex flex-wrap gap-2">
                <button
                  disabled={product.status === "featured"}
                  onClick={() => handleStatusChange(product._id, "featured")}
                  className={`px-3 py-1 rounded flex items-center gap-1 ${
                    product.status === "featured"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-yellow-500 text-white hover:bg-yellow-600"
                  }`}
                >
                  <FaStar /> Featured
                </button>

                <button
                  disabled={product.status === "approved"}
                  onClick={() => handleStatusChange(product._id, "approved")}
                  className={`px-3 py-1 rounded flex items-center gap-1 ${
                    product.status === "approved"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  <FaCheckCircle /> Accept
                </button>

                <button
                  disabled={product.status === "rejected"}
                  onClick={() => handleStatusChange(product._id, "rejected")}
                  className={`px-3 py-1 rounded flex items-center gap-1 ${
                    product.status === "rejected"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  <FaTimesCircle /> Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewProducts;
