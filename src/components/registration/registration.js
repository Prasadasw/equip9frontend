import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import jcb from './wallpaperone.jpg';
import loadingAnimation from './loading.json';

const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('mobileNumber', mobileNumber);
    formData.append('password', password);
    formData.append('profilePicture', profilePicture);

    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5000/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const userId = response.data.id; 
      navigate(`/profile/${userId}`); 
    } catch (error) {
      console.error('Error registering user', error);
      setError(error.response ? error.response.data.error : 'Error registering user');
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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600" style={{ fontFamily: 'math' }}>
            Start your journey with us today!
          </p>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="py-2">
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="py-2">
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
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
                required
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
                required
              />
            </div>
            <div className="py-2">
              <label htmlFor="profilePicture" className="sr-only">Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black hover:text-white bg-yellow-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              style={{ fontFamily: 'math' }}
            >
              Register
            </button>
            <div className="text-center mt-4">
              <a href='/loginpage' className="text-blue-600">Already have an account?</a>
            </div>
          </div>
        </form>
      </div>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Lottie options={defaultOptions} height={150} width={150} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
