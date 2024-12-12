import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/images/image1.png',
    '/images/image2.png',

    
  ];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
    <div className='relative w-full h-48 md:h-screen border-l-8 border-r-8 border-white'>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className='object-cover w-full h-full'
      />
      <FaArrowLeft
        className='absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl cursor-pointer'
        onClick={prevSlide}
      />
      <FaArrowRight
        className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl cursor-pointer'
        onClick={nextSlide}
      />
    </div>
    <br />
    <br />
    <br />
    
    {/* 3 Divisions with product photos */}
    <div className='flex flex-wrap mt-8'>
        <div className='relative w-full md:w-1/2 p-2'>
          <img src='/images/LivingRoom.png' alt='Living Room' className='object-cover w-full h-full' />
          <div className='absolute top-8 left-4 p-4 text-black text-3xl font-bold '>
            Living Room
           <Link to={'/shop'}> <div className='mt-2 flex items-center cursor-pointer text-sm'>
              Shop Now <FaArrowRight className='ml-2' />
            </div>
            </Link>
          </div>
        </div>
        <div className='w-full md:w-1/2 flex flex-col p-2'>
          <div className='relative w-full p-2'>
            <img src='/images/BedRoom.png' alt='Bed Room' className='object-cover w-full h-full' />
            <div className='absolute top-8 left-4 p-4 text-black text-3xl font-bold'>
              Bedroom
              <Link to={'/shop'}>  <div className='mt-2 flex items-center cursor-pointer text-sm'>
                Shop Now <FaArrowRight className='ml-2' />
              </div>
              </Link>
            </div>
          </div>
          <div className='relative w-full p-2'>
            <img src='/images/Kitchen.png' alt='Kitchen' className='object-cover w-full h-full' />
            <div className='absolute top-8 left-4 p-4 text-black text-3xl font-bold'>
              Kitchen
              <Link to={'/shop'}> 
              <div className='mt-2 flex items-center cursor-pointer text-sm'>
                Shop Now <FaArrowRight className='ml-2' />
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Header;