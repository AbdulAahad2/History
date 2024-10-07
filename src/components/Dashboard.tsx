import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Dashboard.css';
import HistoryPopup from './History'; // Import the HistoryPopup

interface User {
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
}

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const questionsAnswered = 20;
  const questionsAsked = 15;
  const balance = 2000; // User balance
  const progress = 60; // Progress in percentage
  const expCurrentLevel = 9000;
  const expNextLevel = 10000;

  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPopupType, setSelectedPopupType] = useState<'questionsAsked' | 'questionsAnswered' | null>(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const openPopup = (type: 'questionsAsked' | 'questionsAnswered') => {
    setSelectedPopupType(type);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedPopupType(null);
  };

  return (
    <div className="dashboard-container">
      {/* Right-side dot dash menu button */}
      <div className="menu-toggle">
        <button className="toggle-button" onClick={toggleMenu}>☰</button>
        {isMenuOpen && (
          <div className="interactions">
            <button className="interaction-button" onClick={() => navigate('/history')}>History</button>
            <button className="interaction-button" onClick={() => navigate('/leaderboard')}>Leaderboard</button>
            <button className="interaction-button" onClick={() => navigate('/profile')}>Settings</button>
          </div>
        )}
      </div>

      {/* Profile and Amount Earned/Milestone Section */}
      <div className="top-section">
        <div className="profile-section">
          <img src="../Profile_pic.png" alt="Profile" className="profile-pic" />
          <h1 className="user-name">{user.name}</h1>
          <p className="user-email">{user.email}</p>
          <p className="user-phone">{user.phone}</p>
        </div>

        <div className="amount-earned-milestone-section">
          {/* Amount Earned Section */}
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

          {/* Milestone Section */}
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

      {/* History Section */}
      <div className="history-section">
        <h3>History</h3>
        <div className="history-buttons">
          <button onClick={() => openPopup('questionsAsked')} className="interaction-button">Questions Asked</button>
          <button onClick={() => openPopup('questionsAnswered')} className="interaction-button">Questions Answered</button>
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && selectedPopupType && (
        <HistoryPopup type={selectedPopupType} onClose={closePopup} />
      )}

      {/* Graph Section */}
      <div className="graph-section">
        <h3>Graphs</h3>
        <p>Graph will go here</p>
      </div>
    </div>
  );
};

export default Dashboard;
