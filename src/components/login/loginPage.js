import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import jcb from '../registration/wallpaperone.jpg';
import loadingAnimation from '../registration/loading.json';

const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('mobileNumber', mobileNumber);
    formData.append('password', password);

    try {
      setIsLoading(true);
      
      const response = await axios.post('http://localhost:5000/api/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      
      console.log('Login successful', response.data);
      setIsLoading(false);
      navigate('/profile'); 
    } catch (error) {
      console.error('Error logging in', error);
      setError(error.response ? error.response.data.error : 'Error logging in');
      setIsLoading(false); 
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="absolute inset-0 overflow-hidden">
        <img
          className="w-full h-full object-cover blur-sm opacity-90"
          src={jcb}
          alt="Background"
        />
      </div>
      <div className="relative max-w-md w-full space-y-8 bg-white bg-opacity-75 p-8 rounded-lg border-4 border-yellow-500 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black" style={{ fontFamily: 'math' }}>
            Login to your account
          </h2>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="py-2">
              <label htmlFor="mobileNumber" className="sr-only">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div className="py-2">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black hover:text-white bg-yellow-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              style={{ fontFamily: 'math' }}
            >
              {isLoading ? (
                <Lottie options={defaultOptions} height={30} width={30} />
              ) : (
                'Login'
              )}
            </button>
            <div className="text-center mt-4">
              <span className="text-blue-600">
                Don't have an account?{' '}
                <a href="/" className="underline">
                  Register now
                </a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
