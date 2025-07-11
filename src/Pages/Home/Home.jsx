import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import FeaturedProducts from "./FeaturedProducts";
import TrendingProducts from "./TrendingProducts";
import CouponSlider from "./CouponSlider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UserReviews from "./UserReviews";
import SiteStats from "./SiteStats";

const Home = () => {
      const axiosSecure = useAxiosSecure();

  const [coupons, setCoupons] = useState([]);
  useEffect(() => {
    axiosSecure.get("/all-coupons").then((res) => {
    //   const now = new Date();
    //   const validCoupons = res.data.filter(
    //     (coupon) => new Date(coupon.expiry) > now
    //   );
      setCoupons(res.data);
    });
  }, []);

  return (
    <div className="bg-gray-900">
      <Hero />
      <FeaturedProducts></FeaturedProducts>
      <TrendingProducts></TrendingProducts>
      <CouponSlider coupons={coupons} />
      <UserReviews></UserReviews>
      <SiteStats></SiteStats>
    </div>
  );
};

export default Home;
