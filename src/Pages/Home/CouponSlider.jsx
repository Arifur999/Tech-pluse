import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

const CouponSlider = ({ coupons }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1, // One card per slide
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "0px", // no extra padding
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-white text-center">
        Trending Coupons
      </h2>

      <Slider {...settings}>
        {coupons.map((coupon) => (
          <motion.div
            key={coupon._id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800  rounded-2xl shadow-2xl p-10 text-white text-center "
          >
            <h3 className="text-3xl font-bold text-yellow-400 mb-4 tracking-wider">
              {coupon.code.toUpperCase()}
            </h3>
            <p className="text-lg text-gray-300 mb-2 italic">
              {coupon.description}
            </p>
            <p className="text-xl text-green-400 font-semibold mb-2">
              Discount: {coupon.discount}%
            </p>
            <p className="text-sm text-red-400">
              Expires on: {formatDate(coupon.expiry)}
            </p>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default CouponSlider;
