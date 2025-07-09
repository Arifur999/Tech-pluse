import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <svg
          className="animate-spin -ml-1 mr-3 h-12 w-12 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading spinner"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>

        {/* Loading Text */}
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg font-medium">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
