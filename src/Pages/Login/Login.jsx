import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import login from "/Login-bro.png";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate, useLocation, Link } from "react-router";
import SocialLogin from "../../Components/socialLogin/SocileLogin";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const from = location.state?.from?.pathname || "/"; 

  const onSubmit = (data) => {
    const { email, password } = data;
    signInUser(email, password)
      .then((result) => {
        Swal.fire({
          title: "Success!",
          text: "Login successful",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate(from, { replace: true }); 
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 items-center gap-10 p-6 bg-gray-100 dark:bg-gray-900">
      {/* Login Form */}
      <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
        <form className="space-y-6 mb-2" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
            Sign in to TECH PULSE
          </h2>

          {/* Email Field */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Show Password */}
            <div className="mt-2">
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="w-4 h-4"
                />
                Show Password
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            Login
          </button>

          {/* Register Redirect */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Not registered?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Create account
            </Link>
          </p>
        </form>
              <SocialLogin></SocialLogin>

      </div>

      {/* Image Section */}
      <div className="hidden md:block">
        <img
          src={login}
          alt="Login Illustration"
          className="w-full max-w-md mx-auto"
        />
      </div>
    </div>
  );
};

export default Login;
