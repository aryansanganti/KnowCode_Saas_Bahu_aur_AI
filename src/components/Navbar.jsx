import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Navigation hook for the Login button

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the /login route
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

      {/* Login Button */}
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
