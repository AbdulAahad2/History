import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import History from './components/History'; // Ensure import is correct
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
            navigate('/Dashboard'); // Redirect to the Dashboard
            alert('Login successful');
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
            alert(errorMessage);
        }
    };

    const handleCreateAccount = async (name: string, username: string, password: string, phone: string, email: string) => {
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, username, password, phone, email }),
            });

            if (!response.ok) throw new Error('Failed to register');

            setPopupOpen(false);
            alert('User registered and data saved to Test.xlsx');
        } catch (error) {
            console.error('Registration error:', error);
            alert('An error occurred during registration.');
        }
    };

    const handleProfileClick = () => {
        if (user) {
            // If user is logged in, navigate to the Dashboard
            navigate('/Dashboard');
        } else {
            // If not logged in, open the login popup
            setPopupOpen(true);
        }
    };

    return (
        <>
            <Header onDashboardClick={handleProfileClick} />
            <Routes>
                <Route path="/Dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
                <Route path="/Profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
                <Route path="/History" element={user ? <History username={user.username} /> : <Navigate to="/" />} />
                <Route path="/" element={<h1>Welcome! Please log in.</h1>} />
            </Routes>

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
