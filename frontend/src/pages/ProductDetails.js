import React, { useEffect, useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/product/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [id]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/product/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  } , [product]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const toggleLike = (id) => {
    setLikedProducts((prevLikedProducts) =>
      prevLikedProducts.includes(id)
        ? prevLikedProducts.filter((productId) => productId !== id)
        : [...prevLikedProducts, id]
    );
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/api/cart/carts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: product._id, quantity }),
      });
      if (response.ok) {
        console.log('Product added to cart');
        setButtonClicked(true);
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
    <div className='flex flex-col md:flex-row p-8'>
      {/* Product Image */}
      <div className='w-full md:w-1/2 p-4'>
        <img src={product.image} alt={product.name} className='w-full h-auto object-cover' />
      </div>

      {/* Product Details */}
      <div className='w-full md:w-1/2 p-4'>
        {/* Product Rating */}
        <div className='flex items-center mb-4'>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={`text-black ${i < Math.floor(product.rating) ? '' : 'text-gray-300'}`} />
          ))}
          <span className='ml-2 text-gray-600'>{product.rating}</span>
        </div>

        <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
        <p className='text-lg mb-4'>{product.description}</p>
        <p className='text-2xl font-bold mb-4'>${product.price}</p>

        {/* Quantity Controls */}
        <div className='flex items-center mb-4'>
          <button onClick={decreaseQuantity} className='px-4 py-2 bg-gray-100'>-</button>
          <span className='px-4 py-2 bg-gray-100'>{quantity}</span>
          <button onClick={increaseQuantity} className='px-4 py-2 bg-gray-100'>+</button>
        </div>

        {/* Wishlist Button */}
        <div className='flex items-center mb-4 p-4 w-1/2  justify-center shadow-md rounded-md border-s-black'>
          <FaHeart className='text-black text-2xl mr-2' 
          />
          <span className='text-lg'>Wishlist</span>
        </div>

        {/* Add to Cart Button */}
        <button onClick={handleAddToCart}  className={` px-24 pr-28 py-2 rounded ${buttonClicked ? 'bg-white text-black' : 'bg-black text-white'}`}>
        {buttonClicked ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>

    {/* Products Section */}
    <div className='flex justify-center p-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {products.map((product) => (
              <div key={product._id} className='relative' onClick={() => handleProductClick(product)}>
                <div className='relative group'>
                  <img src={product.image} alt={product.name} className='w-full h-64 object-cover' />
                  <div className='absolute top-2 left-2 bg-[#38CB89] text-white text-xs px-2 py-1'>-50%</div>
                  <FaHeart className={`absolute top-2 right-2 text-xl cursor-pointer ${likedProducts.includes(product._id) ? 'text-red-500' : 'text-white'}`} 
                  onClick={(e) =>{
                    e.stopPropagation();
                    toggleLike(product._id);
                  }}
                  />
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
                  <p className='text-gray-800'>${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer/>

    </div>
  );
};

export default ProductDetails;