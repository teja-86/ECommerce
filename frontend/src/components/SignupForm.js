import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, username, email, password }),
          });
          if (response.ok) {
            navigate('/signin');
          } else {
            const errorData = await response.json();
            console.error('Registration failed:', errorData);
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };

  return (
    <div className='min-h-screen flex flex-col md:flex-row overflow-hidden'>

      <div className='w-full md:w-1/2 h-screen'>
        <img
          src="/images/Signup.png"
          alt="Signup"
          className='object-cover h-full w-full'
        />
      </div>

      <div className='w-full md:w-1/2 h-screen flex items-center justify-center'>
        <div className='w-full md:w-[380px] p-8 bg-white rounded-lg'>
          <h1 className='font-bold text-4xl mb-5'>Sign up</h1>

          <div className='flex mb-5'>
            <p className='text-[#6C7275]'>Already have an account?</p>
           <Link to={'/signin'}> <span className='text-[#38CB89] ml-2 font-bold cursor-pointer'>Sign In</span></Link>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="" className='block mb-4'>
              <input
                type="text"
                placeholder='Your name'
                className='w-full border-b-2 border-gray-300 outline-none py-2'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="" className='block mb-4'>
              <input
                type="text"
                placeholder='Username'
                className='w-full border-b-2 border-gray-300 outline-none py-2'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label htmlFor="" className='block mb-4'>
              <input
                type="email"
                placeholder='Email address'
                className='w-full border-b-2 border-gray-300 outline-none py-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="" className='block mb-4 relative'>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder='Password'
                className='w-full border-b-2 border-gray-300 outline-none py-2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className='absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500'
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </label>
            <label htmlFor="terms" className='flex items-center mb-4'>
              <input type="checkbox" id="terms" className='mr-2 size-4' />
              I agree with Private Policy and Terms
            </label>
            <button
              type="submit"
              className="w-full bg-[#141718] text-[#FFFFFF] px-4 py-2 rounded-lg transition duration-200"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default SignupForm;