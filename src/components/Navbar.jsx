import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase"; // Adjust the import path as needed
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useFirebase();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 fixed top-0 w-full z-10 bg-black">
      {/* Branding */}
      <div className="text-white text-xl font-family-Monograph">
        Eco-Connect
      </div>

      {/* Links */}
      <div className="flex gap-6 mx-auto">
        <Link to="/home">
          <button className="text-white text-base hover:text-gray-300">
            Home
          </button>
        </Link>
        <Link to="/dashboard">
          <button className="text-white text-base hover:text-gray-300">
            Dashboard
          </button>
        </Link>
        <Link to="/contact">
          <button className="text-white text-base hover:text-gray-300">
            Contact
          </button>
        </Link>
        <Link to="/community">
          <button className="text-white text-base hover:text-gray-300">
            Community
          </button>
        </Link>
        <Link to="/marketplace">
          <button className="text-white text-base hover:text-gray-300">
            Market Place
          </button>
        </Link>
      </div>

      {/* Login/Logout Button */}
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleLogout}
              className="text-[#123524] hover:text-[#3E7B27] flex items-center space-x-2 bg-[#EFE3C2] bg-opacity-80 rounded-full px-4 py-2 transition-all duration-300 hover:bg-opacity-100"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleLoginClick}
            className="border border-green-700 text-white py-1 px-4 hover:bg-white hover:text-gray-900 rounded-full transition-all duration-300"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;