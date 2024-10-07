import React from 'react';
import { Link } from 'react-router-dom';
import '../Header.css';
interface HeaderProps {
  onDashboardClick: () => void;
}
const Header: React.FC<HeaderProps> = ({ onDashboardClick }) => {
  return (
    <header className="header">
      <div className="header-logo">Logo</div>
      <nav className="nav-links">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/explore" className="nav-button">Explore</Link>
        <Link to="/wallet" className="nav-button">Wallet</Link>
      </nav>
      <div className="header-icons">
        <Link to="/notifications" className="icon-button">🔔</Link>
        <Link to="/Dashboard" onClick={onDashboardClick} className='icon-button'>👤</Link>
      </div>
    </header>
  );
};

export default Header;
