import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';

const LoginForm = ({setAuthToken}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${apiUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          if (response.ok) {
            const data = await response.json();
            setAuthToken(data.token);
            localStorage.setItem('authToken', data.token);
            navigate('/');
          } else {
            const errorData = await response.json();
            console.error('Login failed:', errorData);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>

            <div className='w-full md:w-1/2 h-64 md:h-screen'>
                <img
                    src="/images/Signup.png"
                    alt="Signup"
                    className='object-cover h-full w-full'
                />
            </div>

            <div className='w-full md:w-1/2 h-auto md:h-screen flex items-center justify-center'>
                <div className='w-full md:w-[380px] p-8 bg-white rounded-lg'>
                    <h1 className='font-bold text-4xl mb-5'>Sign In</h1>

                    <div className='flex mb-5'>
                        <p className='text-[#6C7275]'>Don't have an account yet?</p>
                    <Link to={'/signup'}> <span className='text-[#38CB89] ml-2 font-bold cursor-pointer'>Sign Up</span> </Link>
                    </div>

                    <form action="" onSubmit={handleSubmit}>
                        
                        <label htmlFor="email" className='block mb-4'>
                            <input
                                type="email"
                                placeholder='Your Email address'
                                className='w-full border-b-2 border-gray-300 outline-none py-2'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </label>
                        
                        <label htmlFor="password" className='block mb-4 relative'>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder='Password'
                                className='w-full border-b-2 border-gray-300 outline-none py-2'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <span
                                className='absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500'
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </label>
                        <div className='flex items-center justify-between mb-4'>
                            <label htmlFor="terms" className='flex items-center'>
                                <input type="checkbox" id="terms" className='mr-2' />
                                Remember me
                            </label>
                            <button type="button" className='text-black font-bold cursor-pointer bg-transparent border-none p-0'>Forgot Password?</button>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#141718] text-[#FFFFFF] px-4 py-2 rounded-lg transition duration-200"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;