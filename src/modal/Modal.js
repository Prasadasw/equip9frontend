// Modal.js

import React from 'react';

const Modal = ({ showModal, setShowModal }) => {
  return (
    <div className={showModal ? "fixed inset-0 flex items-center justify-center z-50" : "hidden"}>
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <img src="/path/to/your/gif.gif" alt="Success GIF" className="w-32 h-32 mx-auto mb-4" />
        <p className="text-center text-lg font-bold">Registration Successful!</p>
        <button
          className="block w-full mt-4 py-2 px-4 bg-yellow-500 text-white rounded-md text-center"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
