import React, { useContext, useState } from "react";  
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../../Components/Loading/Loading";
import UpdateProductModal from "./UpdateProductModal";  

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedProduct, setSelectedProduct] = useState(null);  

  const fetchMyProducts = async () => {
    if (!user?.email) return [];
    const { data } = await axiosSecure.get(`/api/user/products?email=${user.email}`);
    return data;
  };

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-products", user?.email],
    queryFn: fetchMyProducts,
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/api/user/product/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Your product has been deleted.", "success");
      queryClient.invalidateQueries(["my-products", user?.email]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete the product.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // এখন handleUpdate শুধু selectedProduct সেট করবে, navigate করবে না
  const handleUpdate = (id) => {
    const product = products.find((p) => p._id === id);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleUpdateProduct = async (updatedData) => {
    try {
      await axiosSecure.put(`/api/user/product/${selectedProduct._id}`, updatedData);
      Swal.fire("Success", "Product updated successfully", "success");
      queryClient.invalidateQueries(["my-products", user?.email]);
      setSelectedProduct(null);  
    } catch (error) {
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="text-center mt-20 text-red-600">
        <p>Error loading products: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        My Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">You have not posted any products yet.</p>
      ) : (
        <motion.table
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full border-collapse shadow-lg rounded-lg overflow-hidden"
        >
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Product Name</th>
              <th className="py-3 px-4 text-center">Votes</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ _id, productName, votes, status }) => (
              <tr
                key={_id}
                className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700"
              >
                <td className="py-3 text-gray-300 px-4">{productName}</td>
                <td className="py-3 px-4 text-gray-300 text-center">{votes || 0}</td>
                <td
                  className={`py-3 px-4 text-center font-semibold ${
                    status === "approved"
                      ? "text-green-600"
                      : status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {status || "pending"}
                </td>
                <td className="py-3 px-4 text-center space-x-3">
                  <button
                    onClick={() => handleUpdate(_id)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="Update product"
                    title="Update"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(_id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Delete product"
                    title="Delete"
                    disabled={deleteMutation.isLoading}
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      )}

      {/* Modal call */}
      {selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdate={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default MyProducts;
