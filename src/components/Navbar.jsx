import React from 'react';


const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 fixed top-0 w-full z-10 bg-transparent">
      {/* Branding */}
      <div className="text-white text-xl font family-Gilroy">
        Eco-Connect
      </div>

      {/* Links - Centered */}
      <div className="flex gap-6 mx-auto">
        <button className="text-white text-base hover:text-gray-300">Home</button>
        <button className="text-white text-base hover:text-gray-300">Dashboard</button>
        <button className="text-white text-base hover:text-gray-300">Contact</button>
      </div>

      {/* Login Button - Right */}
      <div>
        <button className="border border-green-700 text-white py-1 px-4 hover:bg-white hover:text-gray-900 rounded-full transition-all duration-300">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;