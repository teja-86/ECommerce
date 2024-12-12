import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setAuthToken }) => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken(null);
    navigate('/signin');
  };

  return (
    <div className='flex justify-between items-center p-4 bg-white text-black'>
      <div>
        <h1 className='text-2xl font-bold'>3legant.</h1>
      </div>

      <div className=''>
        <ul className='flex space-x-8'>
          <Link to={'/'}><li className='hover:text-gray-400 cursor-pointer'>Home</li></Link>
          <Link to={'/shop'}><li className='hover:text-gray-400 cursor-pointer'>Shop</li></Link>
          <li className='hover:text-gray-400 cursor-pointer'>Product</li>
          <li className='hover:text-gray-400 cursor-pointer'>Contact Us</li>
        </ul>
      </div>

      <div className='flex space-x-4 relative'>
        <FaSearch className='hover:text-gray-400 cursor-pointer' />
        <FaShoppingCart 
          className='hover:text-gray-400 cursor-pointer' 
          onClick={() => navigate('/cart')}
        />
        <div className='relative'>
          <FaUser 
            className='hover:text-gray-400 cursor-pointer' 
            onClick={() => setShowLogout(!showLogout)}
          />
          {showLogout && (
            <div className='absolute right-0 mt-3 p-2 ps-3 pe-3 z-50 bg-black shadow-lg rounded'>
              <button 
                className='text-white hover:text-gray-400'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;