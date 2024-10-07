import React from 'react';
import './css/History.css'; // Add styles for the popup

interface HistoryPopupProps {
  type: 'questionsAsked' | 'questionsAnswered';
  onClose: () => void;
}

const HistoryPopup: React.FC<HistoryPopupProps> = ({ type, onClose }) => {
  const data = {
    questionsAsked: ['What is React?', 'How to center a div?', 'What is JavaScript?'],
    questionsAnswered: ['What is useState hook?', 'How to fetch API data?', 'Explain CSS flexbox.'],
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h3>{type === 'questionsAsked' ? 'Questions Asked' : 'Questions Answered'}</h3>
        <ul>
          {data[type].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HistoryPopup;
