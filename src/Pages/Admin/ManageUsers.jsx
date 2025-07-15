import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Load all users
  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, [axiosSecure]);

  // Make Moderator
  const handleMakeModerator = async (id) => {
    const res = await axiosSecure.patch(`/users/moderator/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success", "User is now a Moderator", "success");
      reloadUsers();
    }
  };

  // Make Admin
  const handleMakeAdmin = async (id) => {
    const res = await axiosSecure.patch(`/users/admin/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success", "User is now an Admin", "success");
      reloadUsers();
    }
  };

  const reloadUsers = () => {
    axiosSecure.get("/users").then((res) => setUsers(res.data));
  };

  return (
    <div className="p-6 pt-16 md:pt-3 lg:pt-3">
      <h2 className="text-2xl text-blue-500 font-semibold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table  w-full ">
          <thead>
            <tr>
              <th className="text-gray-600 dark:text-gray-300">#</th>
              <th className="text-gray-600 dark:text-gray-300">User Name</th>
              <th className="text-gray-600 dark:text-gray-300">Email</th>
              <th className="text-gray-600 dark:text-gray-300">Role</th>
              <th className="text-gray-600 dark:text-gray-300">Make Moderator</th>
              <th className="text-gray-600 dark:text-gray-300">Make Admin</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-300">
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role || "user"}</td>
                <td>
                  <button
                    onClick={() => handleMakeModerator(user._id)}
                    disabled={user.role === "moderator"}
                    className="btn btn-sm btn-info"
                  >
                    Make Moderator
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    disabled={user.role === "admin"}
                    className="btn btn-sm btn-success"
                  >
                    Make Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
