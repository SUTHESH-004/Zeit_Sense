import React from "react";

const ProfileModal = ({ manager, onClose }) => {
  if (!manager) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-black p-6 rounded-lg w-96 text-white">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">{manager.name}</h2>
          <button onClick={onClose} className="text-red-500">
            Close
          </button>
        </div>
        <p className="mt-4">Email: {manager.email}</p>
        <p className="mt-2">Phone: {manager.phone}</p>
        <p className="mt-2">Experience: {manager.experience}</p>
      </div>
    </div>
  );
};

export default ProfileModal;
