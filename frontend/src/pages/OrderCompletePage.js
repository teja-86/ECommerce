import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid'; 
import { useLocation } from 'react-router-dom';

const OrderCompletePage = () => {
  const location = useLocation();
  const { cart, totalAmount } = location.state;
  const [orderId, setOrderId] = useState('');
  const paymentMethod = 'Credit Card';
  const todayDate = format(new Date(), 'MMMM dd, yyyy'); 

  useEffect(() => {
    setOrderId(uuidv4()); // Generate a unique order ID
  }, []);

 

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='p-8 shadow-lg w-full md:w-1/2 bg-white'>
        <div className='text-center'>
          <h1 className='text-2xl text-[#6C7275] font-bold mb-4'>Thank you 🎉</h1>
          <p className='text-4xl font-bold mb-8'>Your order has been received</p>
        </div>

        <div className='flex justify-center mb-8'>
          {cart.map((item, index) => (
            <img key={index} src={item.productId.image} alt={item.productId.name} className='w-24 h-24 object-cover mx-2' />
          ))}
        </div>

        <div className='text-center mb-8 '>
          <p className='text-sm mb-2 font-bold'><strong className='text-[#6C7275]'>Order Code:</strong>{orderId} </p>
          <p className='text-sm mb-2 font-bold'><strong className='text-[#6C7275]'>Date:</strong> {todayDate}</p>
          <p className='text-sm mb-2 font-bold'><strong className='text-[#6C7275]'>Total:</strong> {totalAmount}</p>
          <p className='text-sm mb-2 font-bold'><strong className='text-[#6C7275]'>Payment Method:</strong> {paymentMethod}</p>
        </div>

        <div className='text-center '>
          <button className='bg-black text-white px-4 py-2 rounded-3xl'>Purchase History</button>
        </div>
      </div>
    </div>
  );
};

export default OrderCompletePage;