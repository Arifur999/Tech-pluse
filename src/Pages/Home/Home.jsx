import React from 'react';
import Hero from './Hero';
import FeaturedProducts from './FeaturedProducts';
import TrendingProducts from './TrendingProducts';

const Home = () => {
    return (
        <div>
           <Hero/>
           <FeaturedProducts></FeaturedProducts>
           <TrendingProducts></TrendingProducts>
        </div>
    );
};

export default Home;