import { Link, useRouteError } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();

  const status = error?.status;

  return (
    <>
   
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center space-y-6">
        <div className="flex justify-center text-indigo-600 text-6xl">
          <FaExclamationTriangle />
          <h1>{status}</h1>
        </div>

        {status === 404 ? (
          <img
            src="/404.png"
            alt="404 - Not Found"
            className="w-full max-h-72 object-contain rounded-xl mx-auto"
          />
        ) : (
          <div className="text-left bg-gray-100 rounded-md p-4 text-sm text-gray-800 overflow-auto mb-6 max-h-40">
            <p>
              <strong>Message:</strong>{" "}
              {error?.message || "No message provided."}
            </p>
            <p>
              <strong>Status Text:</strong>{" "}
              {error?.status || "No statusText provided."}
            </p>
          </div>
        )}

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-indigo-600 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          ⬅️ Back to Homepage
        </Link>
      </div>
    </div>
    </>
  );
};

export default ErrorPage;
