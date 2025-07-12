import React from 'react';
import computer from "/computer.png";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaReact,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-10 px-4 border-t border-gray-700 shadow-2xl">
      <div className="max-w-11/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 lg:px-14">

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
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">Integrations</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>

       

        {/* Social */}
        <div className='flex flex-col items-end'>
          <h3 className="text-white font-semibold mb-3">Connect</h3>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-blue-500">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-sky-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram />
            </a>
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
