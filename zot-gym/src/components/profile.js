import React, { useState, useRef, useEffect } from "react";

const Profile = (props) => {
  const { id, name, pfp } = props
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
      {/* Toggle Button */}
      <button
        className="px-4 py-2 text-white font-semibold rounded-lg focus:outline-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img
            className="w-24 h-24 mx-auto rounded-full border-2 border-blue-500"
            src={pfp}
            alt={name}
          />
      </button>

      {/* Profile Card */}
      {isOpen && (
        <div className="absolute mt-1 h-40 w-54 rounded-lg border border-gray-200 bg-white shadow-lg p-6">          

          <h2 className="mt-1 text-xl font-bold text-gray-800">{name}</h2>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none">
            Manage Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
