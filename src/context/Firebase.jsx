import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("loggedInUser", currentUser.displayName || currentUser.email);

        // Redirect to /home after successful login
        const publicPaths = ['/login', '/'];
        if (publicPaths.includes(location.pathname)) {
          navigate("/home");
        }
      } else {
        setUser(null);
        localStorage.removeItem("loggedInUser");
        const protectedPaths = ['/home'];
        if (protectedPaths.includes(location.pathname)) {
          navigate("/");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  const signinWithGoogle = async () => {
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
    } catch (error) {
      console.error("Google Sign-In Error", error);
      alert("Failed to sign in with Google");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      navigate("/");
    } catch (error) {
      console.error("Logout Error", error);
    }
  };

  return (
    <FirebaseContext.Provider value={{ user, signinWithGoogle, handleLogout }}>
      {children}
    </FirebaseContext.Provider>
  );
};
