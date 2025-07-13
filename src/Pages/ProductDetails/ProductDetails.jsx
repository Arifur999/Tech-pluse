import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { FaThumbsUp, FaFlag, FaUser, FaCalendarAlt, FaStar, FaRegStar } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Rating from "react-rating";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [reportsCount, setReportsCount] = useState(0);

  useEffect(() => {
    // Fetch product details, reviews and report count
    axiosSecure.get(`/products/${id}`).then((res) => setProduct(res.data));
    axiosSecure.get(`/reviews?productId=${id}`).then((res) => setReviews(res.data));
    axiosSecure.get(`/reports/count?productId=${id}`).then((res) => {
      setReportsCount(res.data.count || 0);
    });
  }, [id, axiosSecure]);

  const handleVote = async () => {
    if (!user) return navigate("/login");
    if (user.email === product.ownerEmail || product.voters?.includes(user.email)) return;

    try {
      const res = await axiosSecure.put(`/products/upvote/${id}`, { voter: user.email });
      if (res.data.modifiedCount > 0) {
        const updated = await axiosSecure.get(`/products/${id}`);
        setProduct(updated.data);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to upvote the product", "error");
    }
  };

  const handleReport = async () => {
    if (!user) return navigate("/login");

    const result = await Swal.fire({
      title: "Report this product?",
      text: "Your report will be reviewed by moderators.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Report",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.post("/reports", {
          productId: id,
          reporter: user.email,
          reportedAt: new Date(),
        });

        if (res.status === 200 || res.status === 201) {
          Swal.fire("Reported!", "Your report has been submitted.", "success");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          Swal.fire("Oops!", error.response.data.message || "You have already reported this product.", "info");
        } else {
          Swal.fire("Error", "Failed to submit report", "error");
        }
      } finally {
        const res = await axiosSecure.get(`/reports/count?productId=${id}`);
        setReportsCount(res.data.count || 0);
      }
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");

    const review = {
      productId: id,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      reviewText,
      rating,
      timestamp: new Date(),
    };

    try {
      const res = await axiosSecure.post("/reviews", review);
      if (res.data.insertedId) {
        Swal.fire("Thank you!", "Your review has been submitted.", "success");
        setReviewText("");
        setRating(5);
        const updated = await axiosSecure.get(`/reviews?productId=${id}`);
        setReviews(updated.data);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  if (!product) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="w-full py-10 px-4 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Product Section */}
      <div className="grid md:grid-cols-2 w-11/12 mx-auto gap-10 items-center">
        <img
          src={product.productImage}
          alt={product.productName}
          className="lg:max-w-md rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-2">
            {product.productName}
          </h2>
          <p className="mb-3">{product.description}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {product.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-600 px-2 py-1 text-sm rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          {product.externalLink && (
            <Link
              to="/products"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline block mb-4"
            >
              Visit Product Page
            </Link>
          )}

          <div className="mb-6 space-y-2 text-gray-700 dark:text-gray-300">
            <p className="flex items-center gap-2">
              <FaUser /> <strong>Added By:</strong> {product.ownerName || "Unknown"}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt />{" "}
              <strong>Added On:</strong>{" "}
              {new Date(product.timestamp).toLocaleDateString()}{" "}
              {new Date(product.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="flex items-center gap-2">
              <FaThumbsUp /> <strong>Total Likes:</strong> {product.votes || 0}
            </p>
            <p className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <FaFlag /> <strong>Reports:</strong> {reportsCount}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleVote}
              disabled={
                user?.email === product.ownerEmail ||
                product.voters?.includes(user?.email)
              }
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full disabled:opacity-50"
            >
              <FaThumbsUp /> {product.votes || 0}
            </button>

            <button
              onClick={handleReport}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full"
            >
              <FaFlag /> Report
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-14 w-11/12 mx-auto">
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No reviews yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                className="p-5 rounded-lg shadow-md bg-white dark:bg-gray-800 border dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={review.reviewerImage}
                    alt="avatar"
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                  />
                  <div>
                    <p className="font-semibold text-lg text-blue-600 dark:text-blue-400">
                      {review.reviewerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(review.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800 dark:text-gray-200 mb-2">{review.reviewText}</p>
                <Rating
                  initialRating={review.rating}
                  readonly
                  emptySymbol={<FaRegStar className="text-yellow-400" />}
                  fullSymbol={<FaStar className="text-yellow-400" />}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Review Section */}
      <div className="mt-10 w-11/12 mx-auto">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <form
          onSubmit={handleReviewSubmit}
          className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              readOnly
              value={user?.displayName || ""}
              className="px-4 py-2 border rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
            <input
              readOnly
              value={user?.photoURL || ""}
              className="px-4 py-2 border rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
          </div>
          <textarea
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
            className="w-full border rounded px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Write your thoughts about this product..."
          ></textarea>
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Rating</label>
            <Rating
              initialRating={rating}
              emptySymbol={<FaRegStar className="text-yellow-400 text-xl" />}
              fullSymbol={<FaStar className="text-yellow-400 text-xl" />}
              onChange={(value) => setRating(value)}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
