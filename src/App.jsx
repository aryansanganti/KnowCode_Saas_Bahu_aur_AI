import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './context/Firebase';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import IssueRaiser from './components/IssueRaiser';
import IssueResolver from './components/IssueResolver';
import LandingPage from './components/LandingPage';
import ReusePage from './components/ReusePage';
import ReducePage from './components/ReducePage';
import RecycleTracker from './components/RecyclePage';
import EcoDashboard from './components/EcoDashboard';
import ContactUs from './components/ContactUs';
import MarketPlace from './components/MarketPlace';
import EcoFriendlyCommunityForum from './components/CommunityForum';


function App() {
  return (
    <Router>
      <FirebaseProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/issue-raiser" element={<IssueRaiser />} />
          <Route path="/issue-resolver" element={<IssueResolver />} />
          <Route path="/reduce-page" element={<ReducePage/>} />
          <Route path="/reuse-page" element={<ReusePage />} />
          <Route path="/recycle-page" element={<RecycleTracker/>} />
          <Route path="/dashboard" element={<EcoDashboard/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/marketplace" element={<MarketPlace/>} />
          <Route path="/community" element={<EcoFriendlyCommunityForum/>} />
        </Routes>
      </FirebaseProvider>
    </Router>
  );
}


export default App;