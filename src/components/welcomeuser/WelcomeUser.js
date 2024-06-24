import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import jcb from '../registration/wallpaperone.jpg';

const WelcomeUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('User not found or an error occurred while fetching user data.');
      }
    };

    if (userId) {
      fetchData();
    } else {
      setError('No user ID provided.');
    }
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

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
        <div className="text-center">
          <div className="mt-4">
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={userData.profilePictureUrl}
              alt="Profile"
            />
          </div>
          <div className="mt-4">
            <p className="text-gray-700 text-lg">{userData.firstName} {userData.lastName}</p>
            <p className="text-gray-700 text-lg">{userData.mobileNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeUser;
