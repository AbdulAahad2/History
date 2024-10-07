// src/components/Register.tsx
import React, { useState } from 'react';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateAccount = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    email: `${username}@example.com`,
                    phone: '0000000000',
                    joinedDate: new Date().toLocaleDateString(),
                    username,
                    password,
                    profileImage: null, // or some default image URL
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Account created successfully!');
                // Optionally navigate to a different page or update state
            } else {
                alert('Failed to create account.');
            }
        } catch (error: unknown) {
            // Use type guard to check if error is an instance of Error
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An unknown error occurred.');
            }
        }
    };

    return (
        <div>
            <h1>Create Account</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleCreateAccount}>Register</button>
        </div>
    );
};

export default Register;
