// TokenDetailsPopup.tsx
import React from 'react';
import './css/TokenDetailsPopup.css'; // Your CSS file for styling

// Define the props for the TokenDetailsPopup
interface TokenDetailsPopupProps {
    task: string;         // The task description
    tokensEarned: number; // The amount of tokens earned
    onClose: () => void;  // Function to close the popup
}

const TokenDetailsPopup: React.FC<TokenDetailsPopupProps> = ({ task, tokensEarned, onClose }) => {
    return (
        <div className="token-details-popup">
            <div className="popup-content">
                <h2>Token Details</h2>
                <p><strong>Task:</strong> {task}</p>
                <p><strong>Stakes Earned:</strong> {tokensEarned}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default TokenDetailsPopup;
