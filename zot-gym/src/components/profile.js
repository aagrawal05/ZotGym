import React, { useState, useRef, useEffect } from "react";

const Profile = (props) => {
  const { id, name, pfp } = props;
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);

  // Close the profile card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={profileRef}>
      <button
        className="px-4 py-2 text-white font-semibold rounded-full focus:outline-none transition-all duration-200 transform hover:scale-105"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img
          className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 transition-all duration-300 ease-in-out hover:shadow-xl"
          src={pfp ? pfp : "https://static-00.iconduck.com/assets.00/profile-circle-icon-256x256-cm91gqm2.png"}
          alt={name}
        />
      </button>

      {!isOpen && (
        <div className="absolute mt-3 left-1/2 transform -translate-x-1/2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg p-4 transition-all duration-300 ease-in-out">
            <h2 className="text-lg font-semibold text-gray-800 truncate text-center">{name}</h2>
            <button
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none transition-all duration-200"
              onClick={() => { localStorage.clear(); window.location.href = '/'; }}
            >
              Sign Out
            </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
