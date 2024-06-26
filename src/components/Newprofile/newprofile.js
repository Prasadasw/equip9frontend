import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jcb from '../registration/wallpaperone.jpg';

const NewProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${id}`);
          setUser(response.data);
          console.log('Fetched user data:', response.data); 
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    } else {
      console.error('No user ID provided in URL');
    }
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <img
          className="w-full h-full object-cover blur-sm opacity-30"
          src={jcb}
          alt="Background"
        />
      </div>
      <div className="relative max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-black-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            className="object-cover object-top w-full"
            src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
            alt='Mountain'
          />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover object-center h-32"
            src={user.profilePictureUrl}
            alt={`${user.firstName} ${user.lastName}`}
          />
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
          <p className="text-gray-500">Mobile: {user.mobileNumber}</p>
        </div>
        
        <div className="p-4 border-t mx-8 mt-2">
          <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
            Log Out 
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProfile;
