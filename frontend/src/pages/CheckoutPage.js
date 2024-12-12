import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart: initialCart, shippingOption } = location.state;
  const [cart, setCart] = useState(initialCart);

  const [coupon, setCoupon] = useState('');

  const increaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };


  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
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

  const handlePlaceOrder = () => {
    const totalAmount = calculateTotal();
    const cartImages = cart.map(item => item.productId.image); // Extract images from cart items
  
    navigate('/ordercomplete', { state: { cart, totalAmount, cartImages } });
  }

  return (
    <div className='p-8'>
         <div className='mb-8 '>
        <h1 className='text-4xl font-bold text-center p-12'>Check Out</h1>
        </div>
      <div className='flex flex-col md:flex-row ml-10'>
        {/* Contact Information and Shipping Address */}
        <div className='w-full md:w-2/3 p-4'>
          <h2 className='text-2xl font-bold mb-4'>Contact Information</h2>
          <form className='mb-8'>
            <div className='mb-4'>
              <label className='block mb-2'>First Name</label>
              <input type='text' className='w-1/2 p-2 border border-gray-300 rounded' />
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>Last Name</label>
              <input type='text' className='w-1/2 p-2 border border-gray-300 rounded' />
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>Phone Number</label>
              <input type='text' className='w-1/2 p-2 border border-gray-300 rounded' />
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>Email Address</label>
              <input type='email' className='w-1/2 p-2 border border-gray-300 rounded' />
            </div>
          </form>

          <h2 className='text-2xl font-bold mb-4'>Shipping Address</h2>
          <form className='mb-8'>
            <div className='mb-4'>
              <label className='block mb-2'>Street Address *</label>
              <input type='text' className='w-1/2 p-2 border border-gray-300 rounded' />
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>Country *</label>
              <input type='text' className='w-1/2 p-2 border border-gray-300 rounded' />
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>Town / City *</label>
              <input type='text' className='w-1/2 p-2 border border-gray-300 rounded' />
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>State</label>
              <input type='text' className='w-1/2 p-2 border border-gray-300 rounded' />
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>Zip Code</label>
              <input type='text' className='w-1/2 p-2 border border-gray-300 rounded' />
            </div>
            <div className='mb-4'>
              <label className='flex items-center'>
                <input type='checkbox' className='mr-2' />
                Use a different billing address (optional)
              </label>
            </div>
          </form>

          <h2 className='text-2xl font-bold mb-4'>Payment Method</h2>
          <form className='mb-8'>
            <div className='mb-4'>
              <label className='flex items-center mb-2'>
                <input type='radio' name='payment' value='card' className='mr-2' />
                Pay by Card Credit
              </label>
              <label className='flex items-center mb-2'>
                <input type='radio' name='payment' value='paypal' className='mr-2' />
                Paypal
              </label>
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>Card Number</label>
              <input type='text' className='w-1/2 p-2 border border-gray-300 rounded' />
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>Expiration Date</label>
              <input type='text' className='w-1/2 p-2 border border-gray-300 rounded' />
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>CVC</label>
              <input type='text' className='w-1/2 p-2 border border-gray-300 rounded' />
            </div>
            <button onClick={handlePlaceOrder}  className='bg-black text-white px-4 py-2 rounded'>Place Order</button>
          </form>
        </div>

        {/* Order Summary */}
        <div className='w-full md:w-1/3 p-4 bg-white rounded'>
          <h2 className='text-2xl font-bold mb-4'>Order Summary</h2>
          {cart.map((item, index) => (
            <div key={index} className='flex items-center mb-4'>
              <img src={item.productId.image} alt={item.productId.name} className='w-24 h-24 object-cover mr-4' />
              <div className='flex-1'>
                <h2 className='text-xl font-bold'>{item.productId.name}</h2>
                <div className='flex items-center'>
                  <button onClick={() => decreaseQuantity(index)} className='px-4 py-2 bg-gray-300'>-</button>
                  <span className='px-4'>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(index)} className='px-4 py-2 bg-gray-300'>+</button>
                </div>
              </div>
              <div className='flex-1 text-right'>
                <p className='text-lg font-bold'>${(item.productId.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className='mb-4'>
            <label className='block mb-2'>Coupon</label>
            <input
              type='text'
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
            />
            <button className='bg-black text-white px-4 py-2 rounded mt-2'>Apply</button>
          </div>
          <div className='mb-4 flex justify-between'>
            <p className='text-lg'>Shipping:</p>
            <p className='text-lg'>{shippingOption === 'express' ? '$20.00' : shippingOption === 'pickup' ? '$5.00' : 'Free'}</p>
          </div>
          <div className='mb-4 flex justify-between'>
            <p className='text-lg'>Subtotal:</p>
            <p className='text-lg'>${calculateSubtotal()}</p>
          </div>x
          <div className='mb-4 flex justify-between'>
            <p className='text-lg'>Total:</p>
            <p className='text-lg'>${calculateTotal()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;