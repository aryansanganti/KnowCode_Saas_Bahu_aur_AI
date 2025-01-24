// import React from 'react';
// import { useNavigate } from 'react-router-dom';
import FloatingChatBubble from './FloatingChatBubble';

// const LandingPage = () => {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Redirect to the /login route after the user clicks the Login link
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-2xl mb-4">This is the Landing Page</h1>
//         {/* Login button with click handler */}
//         <button
//           onClick={handleLogin}
//           className="text-blue-600 hover:underline"
//         >
//           Login
//         </button>
//       </div>
//       <FloatingChatBubble />
//     </div>
//   );
// };

// export default LandingPage;
import React, { useRef } from "react";
import Navbar from './Navbar';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LandingPage.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Import assets
import backgroundVideo from '../assets/sus.mp4';
import myImage from '../assets/hand.jpg';

const LandingPage = () => {
  const page2Ref = useRef(null);
  const h1Ref = useRef(null);
  const words = ['Reuse', 'Reduce', 'Recycle'];

  useGSAP(() => {
    const h1Element = h1Ref.current;
    const parentElement = page2Ref.current;

    if (h1Element && parentElement) {
      // Clone the text
      const duplicateText = h1Element.cloneNode(true);
      duplicateText.style.position = 'absolute';
      duplicateText.style.left = '100%'; // Start right after the original text
      // parentElement.appendChild(duplicateText);

      // Infinite scroll animation
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'linear' } });
      tl.to([h1Element, duplicateText], {
        x: '-100%', // Move both the original and duplicate
        duration: 150,
      });
    }
  }, { scope: page2Ref });

  return (
    <div className="overflow-y-auto h-screen w-screen scroll-smooth">
      <Navbar />
      
      {/* Section 1: Title with Background Video */}
      <section className="h-screen w-screen flex justify-center items-center bg-blue-500 text-white relative max-w-full max-h-screen">
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover" 
          autoPlay 
          loop 
          muted
        >
          <source 
            src={backgroundVideo}
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>

        <div 
          className="absolute top-0 left-0 w-full h-full bg-[#7FCC67] z-0"
          style={{
            clipPath: 'polygon(0% 0%, 40% 0%, 20% 100%, 0% 100%)',
          }}
        ></div>

        <h1 className="text-8xl font-family-Gilroy font-bold z-10 absolute top-[40%] left-[5vw]">
          Where Sustainability meets Possibility
        </h1>
      </section>

      <section 
        ref={page2Ref} 
        className="relative h-[24vh] w-screen bg-black flex justify-center items-center overflow-hidden"
      >
        <h1 
          ref={h1Ref}
          class="text-white text-6xl font-bold uppercase text-nowrap absolute left-1/2 transform -translate-x-1/2">
          LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.LIVE GREEN . LIVE WELL. GREENING EVERY STEP OF THE WAY.
        </h1>
      </section>


      {/* Section 2: Random Image */}
      <section className="h-screen w-screen flex justify-center items-center bg-gray-200 relative max-w-full max-h-screen overflow-hidden">
        <img
          src={myImage}
          alt="Random"
          className="w-full h-full object-cover"
        />

        {/* Centered Text */}
        <div className="absolute text-black text-8xl font-bold text-center space-y-4">
  {/* Wrapper for each word with hover effect */}
  {["Reuse", "Reduce", "Recycle"].map((word, index) => (
    <div key={index} className="elem">
      <div className="text-div">
        <h1>{word}</h1>
        <h1>{word}</h1>
      </div>
    </div>
  ))}
</div>

      </section>

      {/* Section 3: How to Use Title */}
      <section className="h-screen w-screen flex flex-col justify-center items-center bg-green-400 text-white px-8 max-w-full max-h-screen">
        <h2 className="text-4xl font-bold mb-6">How to Use This App</h2>
        <div className="flex items-center space-x-6">
          {/* First Image with two arrows pointing to the center */}
          <div className="flex flex-col items-center">
            <img
              src="image1.png"
              alt="Step 1"
              className="w-56 h-56 object-cover rounded-lg shadow-lg"
            />
            <p className="mt-2 text-lg">Step 1</p>
          </div>

          {/* Arrows pointing to the two center images */}
          <div className="flex flex-col items-center space-y-4">
            <span className="text-8xl font-bold transform rotate-[-45deg]">{`→`}</span>
            <span className="text-8xl font-bold transform rotate-[45deg]">{`→`}</span>
          </div>

          {/* Two Center Images */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col items-center">
              <img
                src="image2.png"
                alt="Step 2"
                className="w-56 h-56 object-cover rounded-lg shadow-lg"
              />
              <p className="mt-2 text-lg">Step 2</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="image3.png"
                alt="Step 3"
                className="w-56 h-56 object-cover rounded-lg shadow-lg"
              />
              <p className="mt-2 text-lg">Step 3</p>
            </div>
          </div>

          {/* Arrows pointing to the last image */}
          <div className="flex flex-col items-center space-y-4">
            <span className="text-8xl font-bold transform rotate-[45deg]">{`→`}</span>
            <span className="text-8xl font-bold transform rotate-[-45deg]">{`→`}</span>
          </div>

          {/* Last Image */}
          <div className="flex flex-col items-center">
            <img
              src="image4.png"
              alt="Step 4"
              className="w-56 h-56 object-cover rounded-lg shadow-lg"
            />
            <p className="mt-2 text-lg">Step 4</p>
          </div>
        </div>
      </section>

      {/* Section 4: FAQs */}
      <section className="h-screen w-screen flex flex-col justify-center items-center bg-yellow-300 px-8 max-w-full max-h-screen">
        <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-2xl">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">What is this app for?</h3>
            <p>This app is a demonstration of a multi-section layout in React.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">How can I customize it?</h3>
            <p>
              You can customize the sections by modifying the components and styles
              in the source code.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Is this app responsive?</h3>
            <p>
              Yes, the app is designed to be fully responsive using Tailwind CSS.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Footer */}
      <footer className="bg-gradient-to-r from-green-600 to-blue-500 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo/Brand Name */}
            <div className="text-2xl font-semibold">
              <span>Sustainability</span>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#home" className="hover:text-gray-300">Home</a>
              <a href="#about" className="hover:text-gray-300">About</a>
              <a href="#services" className="hover:text-gray-300">Services</a>
              <a href="#contact" className="hover:text-gray-300">Contact</a>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-300">
                <i className="fab fa-facebook-f"></i> {/* Facebook Icon */}
              </a>
              <a href="#" className="hover:text-gray-300">
                <i className="fab fa-twitter"></i> {/* Twitter Icon */}
              </a>
              <a href="#" className="hover:text-gray-300">
                <i className="fab fa-linkedin-in"></i> {/* LinkedIn Icon */}
              </a>
              <a href="#" className="hover:text-gray-300">
                <i className="fab fa-instagram"></i> {/* Instagram Icon */}
              </a>
            </div>
          </div>
          <FloatingChatBubble />
          {/* Copyright Section */}
          <div className="mt-8 text-center text-lg">
            <p>© {new Date().getFullYear()} Sustainability. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
