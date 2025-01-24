import React from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingChatBubble from './FloatingChatBubble';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Redirect to the /login route after the user clicks the Login link
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl mb-4">This is the Landing Page</h1>
        {/* Login button with click handler */}
        <button
          onClick={handleLogin}
          className="text-blue-600 hover:underline"
        >
          Login
        </button>
      </div>
      <FloatingChatBubble />
    </div>
  );
};

export default LandingPage;