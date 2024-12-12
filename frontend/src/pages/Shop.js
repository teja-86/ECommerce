import React, { useEffect, useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
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

      const handleProductClick = (id) => {
        navigate(`/product/${id}`);
      };

      const toggleLike = (id) => {
        setLikedProducts((prevLikedProducts) =>
          prevLikedProducts.includes(id)
            ? prevLikedProducts.filter((productId) => productId !== id)
            : [...prevLikedProducts, id]
        );
      };


  return (
    <div>    
    <div className='relative w-11/12 h-100 ml-14'>
      <img
        src='/images/ShopPage.png'
        alt='Shop Background'
        className='object-cover w-full h-full'
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center text-white'>
        <h1 className='text-4xl font-bold mb-4'>Shop Page</h1>
        <p className='text-lg'>Let’s design the place you always imagined.</p>
      </div>
    </div>
    
    {/* Filter Section */}
    <div className='flex flex-wrap justify-start mt-8 ml-48 p-4 bg-white'>
        <div className='w-full md:w-auto p-4'>
          <h3 className='text-xl font-semibold mb-2'>Categories</h3>
          <select className='w-full p-2 border border-gray-300 rounded'>
            <option>All Categories</option>
            <option>Furniture</option>
            <option>Lighting</option>
            <option>Decor</option>
            <option>Outdoor</option>
          </select>
        </div>
        <div className='w-full md:w-auto p-4'>
          <h3 className='text-xl font-semibold mb-2'>Price</h3>
          <select className='w-full p-2 border border-gray-300 rounded'>
            <option>All Prices</option>
            <option>$0 - $50</option>
            <option>$50 - $100</option>
            <option>$100 - $200</option>
            <option>$200+</option>
          </select>
        </div>
      </div>

        {/* Products Section */}
        <div className='flex justify-center p-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {products.map((product) => (
              <div key={product._id} className='relative' onClick={() => handleProductClick(product._id)}>
                <div className='relative group'>
                  <img src={product.image} alt={product.name} className='w-full h-64 object-cover' />
                  <div className='absolute top-2 left-2 bg-[#38CB89] text-white text-xs px-2 py-1'>-50%</div>
                  <FaHeart className={`absolute top-2 right-2 text-xl cursor-pointer ${likedProducts.includes(product._id) ? 'text-red-500' : 'text-white'}`} 
                  onClick={(e) =>{
                    e.stopPropagation();
                    toggleLike(product._id);
                  }}/>
                  <button className='absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity'>
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
        </div>
        
         {/* Show More Button */}
      <div className='flex justify-center mt-8 mb-14'>
        <button className='border border-black text-black px-4 py-2 rounded-full'>
          Show More
        </button>
      </div>
      <Footer/>
    </div>

  );
};

export default Shop;