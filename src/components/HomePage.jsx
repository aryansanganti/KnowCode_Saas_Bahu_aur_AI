import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { FiLogOut } from "react-icons/fi";

const HomePage = () => {
  const { user, handleLogout } = useFirebase();
  const username = user?.displayName || user?.email || "User";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <button 
          onClick={handleLogout}
          className="text-red-600 hover:text-red-800 flex items-center space-x-2"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
      <div className="text-center bg-white p-10 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6">Welcome, {username}</h1>
        <div className="space-x-4">
          <Link
            to="/issue-raiser"
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
          >
            Raise an Issue
          </Link>
          <Link
            to="/issue-resolver"
            className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 inline-block"
          >
            Resolve an Issue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

///sdf
