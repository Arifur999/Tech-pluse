import React from 'react';
import computer from "/computer.png";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaReact,
} from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-10 px-4 border-t border-gray-700 shadow-2xl">
      <div className="max-w-11/12 mx-auto grid grid-cols-1 md:grid-cols-4 justify-between gap-8 lg:px-14">

        {/* Brand */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2  rounded-full">
              <img src={computer}
              className='h-10 rounded-full' alt="" />
            </div>
            <span className="text-xl font-bold text-white">Tech Pulse</span>
          </div>
          <p className="text-sm text-gray-400">
            Empowering innovations through technology. One click at a time.
          </p>
        </div>

        {/* Product */}
        <div className='flex flex-col items-center'>
			
          <h3 className="text-white font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to='/' className="hover:text-white">Home</Link></li>
            <li><Link to='/products' className="hover:text-white">Products</Link></li>
            <li><Link to='/contact' className="hover:text-white">contact</Link></li>
          </ul>
        </div>

       

        {/* Social */}
        <div className='flex flex-col items-end'>
          <h3 className="text-white font-semibold mb-3">Connect</h3>
          <div className="flex gap-4 text-lg">
            <Link to='/' className="hover:text-blue-500">
              <FaFacebookF />
            </Link>
            <Link to='/' className="hover:text-sky-400">
              <FaTwitter />
            </Link>
            <Link to='/' className="hover:text-pink-500">
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Tech Pulse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
