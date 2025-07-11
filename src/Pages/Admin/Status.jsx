import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUsers, FaBoxOpen, FaFlag } from "react-icons/fa";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Status = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["status-analytics"],
    queryFn: async () => {
      const [
        usersRes,
        allProductsRes,
        acceptedRes,
        pendingRes,
        reviewsRes,
      ] = await Promise.all([
        axiosSecure.get("/users/count"),
        axiosSecure.get("/products/count"),
        axiosSecure.get("/products/count?status=accepted"),
        axiosSecure.get("/products/count?status=pending"),
        axiosSecure.get("/reviews/count"),
      ]);
      
      return {
        totalUsers: usersRes.data.count || 0,
        totalProducts: allProductsRes.data.count || 0,
        acceptedProducts: acceptedRes.data.count || 0,
        pendingProducts: pendingRes.data.count || 0,
        totalReviews: reviewsRes.data.count || 0,
      };
    },
  });
console.log(stats);
  if (isLoading) return <div className="text-center py-10 text-gray-500">Loading stats...</div>;

  const pieData = [
    { name: "Accepted Products", value: stats.acceptedProducts },
    { name: "Pending Products", value: stats.pendingProducts },
    { name: "Reviews", value: stats.totalReviews },
    { name: "Users", value: stats.totalUsers },
  ];

  return (
    <div className="p-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 pt-10 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center gap-4">
          <FaUsers className="text-blue-500 text-3xl" />
          <div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Users</h4>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center gap-4">
          <FaBoxOpen className="text-green-500 text-3xl" />
          <div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Products</h4>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalProducts}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center gap-4">
          <FaFlag className="text-red-500 text-3xl" />
          <div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Reviews</h4>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalReviews}</p>
          </div>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="mt-10 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Site Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Status;
