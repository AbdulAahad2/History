import React from 'react';
import './css/ReleasedTasksPopup.css'; // Add custom CSS for the released tasks popup

interface ReleasedTasksPopupProps {
  onClose: () => void;
}

const ReleasedTasksPopup: React.FC<ReleasedTasksPopupProps> = ({ onClose }) => {
  return (
    <div className="released-tasks-popup">
      <div className="released-tasks-content">
        <h2>Released Tasks</h2>
        {/* Add content or table for released tasks here */}
        <button className="close-popup-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ReleasedTasksPopup;
