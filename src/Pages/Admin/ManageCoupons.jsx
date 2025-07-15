import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    expiry: "",
    description: "",
    discount: "",
  });

  const axiosSecure = useAxiosSecure();

  const loadCoupons = async () => {
    const res = await axiosSecure.get("/coupons");
    setCoupons(res.data);
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure discount is a number
    const newCoupon = {
      ...formData,
      discount: parseFloat(formData.discount),
    };

    const res = await axiosSecure.post("/coupons/add", newCoupon);
    if (res.data.insertedId) {
      Swal.fire("Success", "Coupon added!", "success");
      setFormData({ code: "", expiry: "", description: "", discount: "" });
      loadCoupons();
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Delete this coupon?",
      icon: "warning",
      showCancelButton: true,
    });
    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/coupons/${id}`);
      Swal.fire("Deleted!", "Coupon deleted", "success");
      loadCoupons();
    }
  };

  return (
    <div className="p-6 pt-16 md:pt-3 lg:pt-3 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-400 mb-6">🎟️ Manage Coupons</h2>

      {/* Add Coupon Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow mb-10"
      >
        <input
          type="text"
          name="code"
          placeholder="Coupon Code"
          value={formData.code}
          onChange={handleChange}
          required
          className="input input-bordered text-black"
        />
        <input
          type="date"
          name="expiry"
          value={formData.expiry}
          onChange={handleChange}
          required
          className="input input-bordered text-black"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="input input-bordered text-black"
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount %"
          value={formData.discount}
          onChange={handleChange}
          required
          className="input input-bordered text-black"
        />
        <button type="submit" className="btn btn-primary col-span-full mt-4">
          ➕ Add Coupon
        </button>
      </form>

      {/* Coupon Table */}
      <div className="overflow-x-auto">
        <table className="table  w-full text-gray-600 dark:text-gray-300">
          <thead className="bg-blue-950 text-blue-200">
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Expiry</th>
              <th>Description</th>
              <th>Discount (%)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 dark:bg-gray-900">
            {coupons.map((coupon, i) => (
              <tr key={coupon._id}>
                <td>{i + 1}</td>
                <td>{coupon.code}</td>
                <td>{coupon.expiry}</td>
                <td>{coupon.description}</td>
                <td>{coupon.discount}</td>
                <td>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="btn btn-sm btn-error"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupons;
