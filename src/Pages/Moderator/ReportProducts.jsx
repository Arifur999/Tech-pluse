import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaTrash, FaEye } from "react-icons/fa";

const ReportProducts = () => {
const axiosSecure = useAxiosSecure();
const queryClient = useQueryClient();

const { data: reportsData = {}, isLoading } = useQuery({
  queryKey: ["reported-products"],
  queryFn: async () => {
    const res = await axiosSecure.get("/reports/all");
    return res.data || {};
  },
});

const reports = reportsData.reportedProducts || [];

const deleteMutation = useMutation({
  mutationFn: async (productId) => {
    const res = await axiosSecure.delete(`/reports/delete/${productId}`);
    return res.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["reported-products"]);
    Swal.fire("Deleted!", "Product and related reports deleted.", "success");
  },
});


  const handleDelete = (productId) => {
      console.log("Deleting:", productId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(productId);
      }
    });
  };

  if (isLoading)
    return <div className="text-center py-10 text-gray-600">Loading...</div>;

  return (
    <div className="p-4 pt-16 md:pt-3 lg:pt-3 w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Reported Products
      </h2>

      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
        <table className="min-w-[700px] w-full table-auto border border-gray-300 dark:border-gray-600 rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-200">#</th>
              <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-200">Product Name</th>
              <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-200">Reporter</th>
              <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr
                key={report._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                  {report.productName || "Unnamed Product"}
                </td>
                <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                  {report.reporter}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      to={`/product/${report.productId}`}
                      className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 text-sm"
                    >
                      <FaEye /> View
                    </Link>
                    <button
                      onClick={() => handleDelete(report.productId)}
                      className="px-3 py-1 cursor-pointer rounded bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 text-sm"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-5 text-center text-gray-500">
                  No reported products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportProducts;
