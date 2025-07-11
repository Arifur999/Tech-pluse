import React from "react";
import StarRatings from "react-star-ratings";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Sakib Rahman",
    rating: 5,
    comment: "Amazing product! Very useful and affordable.",
    image: "https://i.ibb.co/4YDsQY1/user1.jpg",
  },
  {
    name: "Anika Tabassum",
    rating: 4,
    comment: "Great value for money. Fast support too!",
    image: "https://i.ibb.co/pRJBDGL/user2.jpg",
  },
  {
    name: "Sakib Rahman",
    rating: 5,
    comment: "Amazing product! Very useful and affordable.",
    image: "https://i.ibb.co/4YDsQY1/user1.jpg",
  },
  {
    name: "Anika Tabassum",
    rating: 4,
    comment: "Great value for money. Fast support too!",
    image: "https://i.ibb.co/pRJBDGL/user2.jpg",
  },
  {
    name: "Sakib Rahman",
    rating: 5,
    comment: "Amazing product! Very useful and affordable.",
    image: "https://i.ibb.co/4YDsQY1/user1.jpg",
  },
  {
    name: "Anika Tabassum",
    rating: 4,
    comment: "Great value for money. Fast support too!",
    image: "https://i.ibb.co/pRJBDGL/user2.jpg",
  },
];

const UserReviews = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-10 text-center">
        What Users Say
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-800 rounded-xl shadow-xl p-6"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={r.image}
                alt={r.name}
                className="w-14 h-14 rounded-full border-2 border-blue-400"
              />
              <div>
                <h3 className="text-white font-semibold">{r.name}</h3>
                <StarRatings
                  rating={r.rating}
                  starRatedColor="#facc15"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                  name="rating"
                />
              </div>
            </div>
            <p className="text-gray-300 italic">"{r.comment}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
