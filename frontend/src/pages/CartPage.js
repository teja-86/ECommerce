import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [shippingOption, setShippingOption] = useState('free');
  const navigate = useNavigate();
  
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }      

      try {
        const response = await fetch(`${apiUrl}/api/cart/carts`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
          
        });
        if (response.ok) {
          const data = await response.json();
          setCart(data.items);
        } else {
          console.error('Failed to fetch cart');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCart();
  }, []);

  const increaseQuantity = async (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
    await updateCart(newCart);
  };

  const decreaseQuantity = async (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
      await updateCart(newCart);
    }
  };

  const removeItem = async (index) => {
    const productId = cart[index].productId;
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    await deleteFromCart(productId);
  };

  const updateCart = async (newCart) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/cart/carts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Ensure `token` is a valid string
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCart)
      });
      if (!response.ok) {
        console.error('Failed to update cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteFromCart = async (productId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/cart/carts/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        console.error('Failed to delete from cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shippingCost = shippingOption === 'express' ? 20 : shippingOption === 'pickup' ? 5 : 0;
    return (subtotal + shippingCost).toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart, shippingOption } });
  };
  

  return (
    <div className='p-8'>
      {/* Cart Heading */}
      <div className='mb-8 '>
        <h1 className='text-4xl font-bold text-center p-12'>Cart</h1>
      </div>

      <div className='flex flex-col md:flex-row'>
        {/* Cart Items */}
        <div className='w-full md:w-2/3 p-4'>
          {cart.map((item, index) => (
            <div key={index} className='flex items-center mb-4 p-4 bg-white rounded shadow'>
              <div className='flex-1'>
                <h2 className='text-xl font-bold'>{item.productId.name}</h2>
                <p className='text-lg'>Description: {item.productId.description}</p>
                <p className='text-lg'>Rating: {item.productId.rating}</p>
              </div>
              <img src={item.productId.image} alt={item.productId.name} className='w-24 h-24 object-cover mr-4' />
              <div className='flex items-center'>
                <button onClick={() => decreaseQuantity(index)} className='px-4 py-2 bg-gray-300'>-</button>
                <span className='px-4'>{item.quantity}</span>
                <button onClick={() => increaseQuantity(index)} className='px-4 py-2 bg-gray-300'>+</button>
              </div>
              <div className='flex-1 text-right'>
                <p className='text-lg font-bold'>${(item.productId.price * item.quantity).toFixed(2)}</p>
              </div>
              <FaTimes className='text-black cursor-pointer ml-4' onClick={() => removeItem(index)} />
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className='w-full md:w-1/3 p-4 bg-white rounded'>
          <h2 className='text-2xl font-bold mb-4'>Cart Summary</h2>
          <div className='mb-4'>
            <label className='flex items-center mb-2'>
              <input
                type='radio'
                name='shipping'
                value='free'
                checked={shippingOption === 'free'}
                onChange={() => setShippingOption('free')}
                className='mr-2'
              />
              Free Shipping
            </label>
            <label className='flex items-center mb-2'>
              <input
                type='radio'
                name='shipping'
                value='express'
                checked={shippingOption === 'express'}
                onChange={() => setShippingOption('express')}
                className='mr-2'
              />
              Express Shipping ($20)
            </label>
            <label className='flex items-center mb-2'>
              <input
                type='radio'
                name='shipping'
                value='pickup'
                checked={shippingOption === 'pickup'}
                onChange={() => setShippingOption('pickup')}
                className='mr-2'
              />
              Pick Up ($5)
            </label>
          </div>
          <div className='mb-4 flex justify-between'>
            <p className='text-lg'>Subtotal:</p>
            <p className='text-lg'>${calculateSubtotal()}</p>
          </div>
          <div className='mb-4 flex justify-between'>
            <p className='text-lg'>Total:</p>
            <p className='text-lg'>${calculateTotal()}</p>
          </div>
          <button onClick={handleCheckout} className='bg-black text-white px-40 mt-6 py-2 rounded'>Checkout</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CartPage;