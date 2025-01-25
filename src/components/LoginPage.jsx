import { useFirebase } from "../context/Firebase";
import { FcGoogle } from "react-icons/fc";
import Navbar from "./Navbar";

const LoginPage = () => {
  const { signinWithGoogle } = useFirebase();

  return (
    <>
     <Navbar/>
     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Community Issue Resolver
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join and make a difference in your community
          </p>
        </div>
        <div>
          <button
            onClick={signinWithGoogle}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FcGoogle className="h-5 w-5" />
            </span>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;