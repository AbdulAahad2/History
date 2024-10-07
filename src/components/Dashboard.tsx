import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Dashboard.css';
import History from './History'; 
import Profile from './Profile'; 
import profilePic from '../Profile_pic.png'; 

interface User {
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  username: string;
  profileImage?: string;
}

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const balance = 2000;
  const progress = 60;
  const expCurrentLevel = 9000;
  const expNextLevel = 10000;

  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<'asked' | 'answered' | null>(null);
  const [isProfileOpen, setProfileOpen] = useState<boolean>(false);

  const goToUserProfile = () => {
    navigate('/profile');
  };

  const goToHistory = () => {
    navigate('/history');
  };

  const goToLeaderboard = () => {
    navigate('/leaderboard');
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const openPopup = (type: 'asked' | 'answered') => {
    setPopupType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupType(null);
  };

  // Debugging console log
  console.log('Rendering Dashboard for user:', user);

  return (
    <div className="dashboard-container">
      <div className="menu-toggle">
        <button className="toggle-button" onClick={toggleMenu}>☰</button>
        {isMenuOpen && (
          <div className="interactions">
            <button className="interaction-button" onClick={goToHistory}>History</button>
            <button className="interaction-button" onClick={goToLeaderboard}>Leaderboard</button>
            <button className="settings-button" onClick={() => setProfileOpen(true)}>
              Settings
            </button>
          </div>
        )}
      </div>

      <div className="top-section">
        <div className="profile-section">
          <img src={user.profileImage || profilePic} alt="Profile" className="profile-pic" />
          <h1 className="user-name">{user.name}</h1>
          <p className="user-email">{user.email}</p>
          <p className="user-phone">{user.phone}</p>
        </div>

        <div className="amount-earned-milestone-section">
          <div className="amount-earned-section">
            <h3>Your Balance</h3>
            <p><strong>${balance}</strong></p>
            <h4>Recent Transactions</h4>
            <ul>
              <li>Purchase: -$200</li>
              <li>Deposit: +$500</li>
              <li>Gift: +$100</li>
            </ul>
          </div>

          <div className="milestone-section">
            <h3>Milestone</h3>
            <div className="circle-progress">
              <div className="progress-circle">
                <span className="progress-value">29</span>
              </div>
            </div>
            <p>{progress}% Complete</p>
            <p>{expNextLevel - expCurrentLevel} XP left to next level</p>
          </div>
        </div>
      </div>

      <div className="history-section">
        <h3>History</h3>
        <button className="interaction-button" onClick={() => openPopup('asked')}>
          View History
        </button>
      </div>

      {showPopup && popupType && (
        <History type={popupType} onClose={closePopup} />
      )}

      {isProfileOpen && (
        <Profile user={user} onClose={() => setProfileOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;
