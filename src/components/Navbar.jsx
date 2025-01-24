import React from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import EcoDashboard from "./EcoDashboard";
import ContactUs from "./ContactUs";s

const Navbar = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the /login route
  };

  return (
    <nav className="flex justify-between items-center p-4 fixed top-0 w-full z-10 bg-transparent">
      {/* Branding */}
      <div className="text-white text-xl font family-Gilroy">
        Eco-Connect
      </div>

      {/* Links - Centered */}
      <div className="flex gap-6 mx-auto">
        <a href={<HomePage/>}><button className="text-white text-base hover:text-gray-300">Home</button></a>
        <a href={<EcoDashboard/>}><button className="text-white text-base hover:text-gray-300">Dashboard</button></a>
        <a href={<ContactUs/>}><button className="text-white text-base hover:text-gray-300">Contact</button></a>
      </div>

      {/* Login Button - Right */}
      <div>
        <button
          onClick={handleLoginClick}
          className="border border-green-700 text-white py-1 px-4 hover:bg-white hover:text-gray-900 rounded-full transition-all duration-300"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
