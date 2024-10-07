import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import History from './components/History';
import AuthPopup from './components/AuthPopup';
import './index.css';

interface User {
    name: string;
    email: string;
    phone: string;
    joinedDate: string;
    username: string;
    profileImage?: string;
}

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Handle login
    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const loggedInUser = await response.json();
            setUser(loggedInUser.user);
            setPopupOpen(false); // Close the popup on successful login
            navigate('/dashboard'); // Redirect to the Dashboard
            alert('Login successful');
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
            alert(errorMessage);
        }
    };

    // Handle create account
    const handleCreateAccount = async (name: string, username: string, password: string, phone: string, email: string) => {
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, username, password, phone, email }),
            });

            if (!response.ok) throw new Error('Failed to register');

            setPopupOpen(false);
            alert('User registered successfully');
        } catch (error) {
            console.error('Registration error:', error);
            alert('An error occurred during registration.');
        }
    };

    // Handle profile click to navigate to Dashboard if logged in
    const handleProfileClick = () => {
        if (user) {
            navigate('/dashboard'); // If user is logged in, navigate to the Dashboard
        } else {
            setPopupOpen(true); // If not logged in, open the login popup
        }
    };

    return (
        <>
            <Header onDashboardClick={handleProfileClick} />
            <Routes>
                <Route path="/" element={<div>Welcome to the App! Please log in or create an account.</div>} /> {/* Welcome Page */}
                <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
                <Route path="/profile" element={user ? <Profile user={user} onClose={() => {}} /> : <Navigate to="/" />} />
                <Route path="/history" element={user ? <History type={'asked'} onClose={() => {}} /> : <Navigate to="/" />} />
            </Routes>

            {/* Auth Popup */}
            {isPopupOpen && (
                <AuthPopup
                    isOpen={isPopupOpen}
                    onClose={() => setPopupOpen(false)}
                    onLogin={handleLogin}
                    onCreateAccount={handleCreateAccount}
                />
            )}
        </>
    );
};

export default App;
