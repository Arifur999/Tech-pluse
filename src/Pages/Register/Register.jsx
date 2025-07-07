import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import registerImg from "/Sign up-bro.png";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;
    const imageFile = photo[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    const imageHostKey = import.meta.env.VITE_IMAGEBB_KEY;
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    try {
      const res = await fetch(imageUploadUrl, {
        method: "POST",
        body: formData,
      });
      const imgData = await res.json();
      if (imgData.success) {
        const photoURL = imgData.data.display_url;

        const result = await createUser(email, password);

        console.log(result);
        await updateUserProfile(name, photoURL);

        reset(); // form reset
        Swal.fire({
          icon: "success",
          title: "Registration successful",
          text: "Welcome to AppOrbit!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error occurred",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 items-center gap-10 p-6 bg-gray-100 dark:bg-gray-900">
      {/* Register Form */}
      <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
            Create a new account
          </h2>

          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
              Upload Photo
            </label>
            <input
              type="file"
              {...register("photo", { required: "Photo is required" })}
              accept="image/*"
              className="w-full px-4 py-2 text-sm border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            {errors.photo && (
              <p className="text-sm text-red-500 mt-1">
                {errors.photo.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            Register
          </button>

          {/* Already have account */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Login here
            </a>
          </p>
        </form>
      </div>

      {/* Image */}
      <div className="hidden md:block">
        <img
          src={registerImg}
          alt="Register"
          className="w-full max-w-md mx-auto"
        />
      </div>
    </div>
  );
};

export default Register;
