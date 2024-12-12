import React from 'react';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='bg-black text-white p-8'>
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <div className='text-3xl font-bold mb-4 md:mb-0'>3legant.</div>
        <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8'>
          <a href='/' className='hover:text-gray-400'>Home</a>
          <a href='/' className='hover:text-gray-400'>Shop</a>
          <a href='/' className='hover:text-gray-400'>Product</a>
          <a href='/' className='hover:text-gray-400'>Blog</a>
          <a href='/' className='hover:text-gray-400'>Contact Us</a>
        </div>
      </div>
      <div className='flex flex-col md:flex-row justify-between items-center mt-8'>
        <div className='text-sm text-gray-400'>
          Copyright © 2023 3legant. All rights reserved. <a href='/' className='text-white font-bold'>Privacy Policy</a> <a href='/' className='text-white font-bold'>Terms of Use</a>
        </div>
        <div className='flex space-x-4 mt-4 md:mt-0'>
          <a href='/' className='hover:text-gray-400'><FaInstagram /></a>
          <a href='/' className='hover:text-gray-400'><FaFacebook /></a>
          <a href='/' className='hover:text-gray-400'><FaYoutube /></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;