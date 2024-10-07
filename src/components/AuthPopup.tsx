import React, { useState } from 'react';
import './css/AuthPopup.css'; // Ensure this points to your CSS file

interface AuthPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (username: string, password: string) => void;
    onCreateAccount: (name: string, username: string, password: string, phone: string, email: string) => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, onClose, onLogin, onCreateAccount }) => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
    const [formData, setFormData] = useState({ username: '', password: '', name: '', phone: '', email: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(formData.username, formData.password);
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreateAccount(formData.name, formData.username, formData.password, formData.phone, formData.email);
    };

    if (!isOpen) return null; // Don't render anything if the popup is closed

    return (
        <>
            <div className="popup-overlay" onClick={onClose}></div>
            <div className="popup-container">
                <button className="close-button" onClick={onClose}>×</button>
                {isLogin ? (
                    <form onSubmit={handleLoginSubmit}>
                        <h2>Login</h2>
                        <input name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" required />
                        <input name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required />
                        <button type="submit">Login</button>
                        <p>Don't have an account? <button type="button" onClick={() => setIsLogin(false)}>Register</button></p>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit}>
                        <h2>Register</h2>
                        <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
                        <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
                        <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" required />
                        <input name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" required />
                        <input name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required />
                        <button type="submit">Register</button>
                        <p>Already have an account? <button type="button" onClick={() => setIsLogin(true)}>Login</button></p>
                    </form>
                )}
            </div>
        </>
    );
};

export default AuthPopup;
