import React from "react";
import { useForm } from "react-hook-form";
import login from "/Login-bro.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Info:", data);
    // handle login logic here (email/password)
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 items-center gap-10 p-6 bg-gray-100 dark:bg-gray-900">
      {/* Login Form */}
      <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
            Sign in to AppOrbit
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
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
              Password
            </label>
            <input
              type="password"
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
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <input type="checkbox" className="w-4 h-4" />
              Remember Me
            </label>
            <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
              Forgot Password?
            </a>
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
            <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
              Create account
            </a>
          </p>
        </form>
      </div>

      {/* Image Section */}
      <div className="hidden md:block">
        <img src={login} alt="Login Illustration" className="w-full max-w-md mx-auto" />
      </div>
    </div>
  );
};

export default Login;
