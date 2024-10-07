import React, { useState } from 'react';
import './css/History.css'; // Custom CSS for the history component
import TokenDetailsPopup from './TokenDetailsPopup'; // Token details popup component

const answeredQuestions = [
  { task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", timeframe: "40min", date: "11/12/2024", level: 2, tokensEarned: 234 },
  { task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", timeframe: "30min", date: "01/12/2024", level: 1, tokensEarned: 134 },
  { task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", timeframe: "38min", date: "11/11/2024", level: 3, tokensEarned: 200 },
  // Add more entries as needed
];

const releasedTasks = [
  { task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", wonBy: "Jett", timeframe: "40min", date: "11/12/2024", stakingReward: 234 },
  { task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", wonBy: "Den", timeframe: "30min", date: "01/12/2024", stakingReward: 134 },
  // Add more entries as needed
];

// Define props interface
interface HistoryProps {
  type: 'asked' | 'answered'; // Define the type prop
  onClose: () => void;        // Function to close the popup
}

const History: React.FC<HistoryProps> = ({ type, onClose }) => {
  const [isTokenPopupOpen, setTokenPopupOpen] = useState(false);
  const [tokenPopupData, setTokenPopupData] = useState<{ task: string; tokensEarned: number } | null>(null);
  const [showAnswered, setShowAnswered] = useState(true); // State to toggle between answered and released tasks

  const openTokenPopup = (task: string, tokensEarned: number) => {
    setTokenPopupData({ task, tokensEarned });
    setTokenPopupOpen(true);
  };

  return (
    <div className="history-popup"> {/* Full-page overlay */}
      <div className="popup-content"> {/* Main content */}
        <h2 className="header-title">Player History</h2>
        <button className="back-button" onClick={onClose}>
        ← <span className="back-icon"></span> {/* Cool space-themed icon */}
        </button>

        <div className="history-container">
          {/* Buttons to toggle between answered tasks and released tasks */}
          <div className="toggle-buttons">
            <button onClick={() => setShowAnswered(true)} className={showAnswered ? 'active' : ''}>
              Answered Tasks
            </button>
            <button onClick={() => setShowAnswered(false)} className={!showAnswered ? 'active' : ''}>
              Released Tasks
            </button>
          </div>

          {/* Conditionally render the sections based on the selected button */}
          {showAnswered ? (
            <div className="answered-tasks">
              <h3>Answered Tasks</h3>
              <table className="answered-tasks-table">
                <thead>
                  <tr>
                    <th>Correctly Answered Task</th>
                    <th>Date</th>
                    <th>Level</th>
                    <th>Token Staking Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {answeredQuestions.map((item, index) => (
                    <tr key={index} onClick={() => openTokenPopup(item.task, item.tokensEarned)}>
                      <td>{item.task}</td>
                      <td>{item.date}</td>
                      <td>{item.level}</td>
                      <td>{item.tokensEarned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="released-tasks">
              <h3>Released Tasks</h3>
              <table className="released-tasks-table">
                <thead>
                  <tr>
                    <th>Asked Tasks</th>
                    <th>Won By</th>
                    <th>TimeFrame</th>
                    <th>Date</th>
                    <th>Staking Rewards</th>
                  </tr>
                </thead>
                <tbody>
                  {releasedTasks.map((item, index) => (
                    <tr key={index}>
                      <td>{item.task}</td>
                      <td>{item.wonBy}</td>
                      <td>{item.timeframe}</td>
                      <td>{item.date}</td>
                      <td>{item.stakingReward}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* View Statistics Button */}
          {/* Token Details Popup */}
          {isTokenPopupOpen && tokenPopupData && (
            <TokenDetailsPopup
              task={tokenPopupData.task}
              tokensEarned={tokenPopupData.tokensEarned}
              onClose={() => setTokenPopupOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
