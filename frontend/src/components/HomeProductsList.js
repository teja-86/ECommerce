import React, { useEffect, useState } from 'react';
import { FaHeart, FaStar, FaShippingFast, FaDollarSign, FaHeadset, FaSyncAlt, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HomeProductsList = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/product/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);


  const toggleLike = (id) => {
    setLikedProducts((prevLikedProducts) =>
      prevLikedProducts.includes(id)
        ? prevLikedProducts.filter((productId) => productId !== id)
        : [...prevLikedProducts, id]
    );
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <div className='flex overflow-x-auto space-x-4 p-4'>
        {products.slice(0, 6).map((product) => (
          <div key={product._id} className='relative w-64' onClick={() => handleProductClick(product._id)}>
            <div className='relative group'>
              <img src={product.image} alt={product.name} className='w-full h-64 object-cover' />
              <div className='absolute top-2 left-2 bg-[#38CB89] text-white text-xs px-2 py-1 rounded-sm'>-50%</div>
              <FaHeart
                className={`absolute top-2 right-2 text-xl cursor-pointer ${likedProducts.includes(product._id) ? 'text-red-500' : 'text-white'}`}
                onClick={(e) =>{
                  e.stopPropagation();
                  toggleLike(product._id);
                }}
              />
              <button className='absolute text-sm bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity'>
                Add to Cart
              </button>
            </div>
            <div className='mt-2 p-2 bg-white'>
              <div className='flex items-center'>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`text-black ${i < Math.floor(product.rating) ? '' : 'text-gray-300'}`} />
                ))}
                <span className='ml-2 text-gray-600'>{product.rating}</span>
              </div>
              <h3 className='text-lg font-bold'>{product.name}</h3>
              <p className='text-gray-800'>{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information Section */}
      <div className='flex justify-around mt-8 p-4 bg-white space-x-4'>
        <div className='text-center p-11 bg-gray-100 rounded shadow'>
          <FaShippingFast className='text-4xl text-black mb-2' />
          <h3 className='text-lg font-bold'>Free Shipping</h3>
          <p className='text-gray-600'>Order above $200</p>
        </div>
        <div className='text-center p-11 bg-gray-100 rounded shadow'>
          <FaDollarSign className='text-4xl text-black mb-2' />
          <h3 className='text-lg font-bold'>Money back</h3>
          <p className='text-gray-600'>30 days guarantee</p>
        </div>
        <div className='text-center p-11 bg-gray-100 rounded shadow'>
          <FaHeadset className='text-4xl text-black mb-2' />
          <h3 className='text-lg font-bold'>Secure Payments</h3>
          <p className='text-gray-600'>Secured by Stripe</p>
        </div>
        <div className='text-center p-11 bg-gray-100 rounded shadow'>
          <FaSyncAlt className='text-4xl text-black mb-2' />
          <h3 className='text-lg font-bold'>24/7 Support</h3>
          <p className='text-gray-600'>Phone and Email support</p>
        </div>
      </div>

      {/* New Container with Image and Text */}
      <div className='flex flex-wrap mt-8 p-4 bg-gray-100'>
        <div className='w-full md:w-1/2 p-2'>
          <img src='/images/BedRoom2.png' alt='Sale' className='object-cover w-full h-full' />
        </div>
        <div className='w-full md:w-1/2 p-2 flex flex-col justify-center text-wrap'>
          <h2 className='text-sm font-bold text-[#377DFF] pb-4'>SALE UP TO 35% OFF</h2>
          <h3 className='text-4xl font-bold mt-2 pb-4'>HUNDREDS of New lower prices!</h3>
          <p className='text-gray-600 mt-2 pb-4'>
            It’s more affordable than ever to give every room in your home a stylish makeover.
          </p>
          <div className='mt-4 flex items-center cursor-pointer text-sm text-black'>
            Shop Now <FaArrowRight className='ml-2' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProductsList;