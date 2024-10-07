import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import AuthPopup from './AuthPopup';
import './css/Profile.css';

interface User {
    name: string;
    email: string;
    phone: string;
    joinedDate: string;
    username: string;
    profileImage?: string;
}

const Profile: React.FC<{ user: User; onClose: () => void }> = ({ user, onClose }) => {
    const [editableUser, setEditableUser] = useState<User>(user);
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(user.profileImage || null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setEditableUser(user);
        setImagePreview(user.profileImage || null);
        loadExcelData(); // Load Excel data when component mounts
    }, [user]);

    const loadExcelData = async () => {
        try {
            const response = await fetch('C:/Users/abdul/stake-city/data/Test.xlsx'); // Adjust the path to your Excel file
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();
            const data = await blob.arrayBuffer();
            const workbook = XLSX.read(data);
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json<User>(firstSheet);
            console.log(jsonData); // Check the content of your Excel file
        } catch (error) {
            console.error("Error loading Excel data:", error);
            setErrorMessage('Failed to load user data from Excel.');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setEditableUser((prev) => ({ ...prev, profileImage: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditableUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateExcelData(editableUser); // Write changes to Excel
            setSuccessMessage('Profile updated successfully!');
            setErrorMessage(null);
        } catch (error) {
            console.error("Error updating profile:", error);
            setErrorMessage('Failed to update profile.');
            setSuccessMessage(null);
        }
    };

    const updateExcelData = async (userData: User) => {
        const response = await fetch('C:/Users/abdul/stake-city/data/Test.xlsx'); // Adjust the path to your Excel file
        const blob = await response.blob();
        const data = await blob.arrayBuffer();
        const workbook = XLSX.read(data);
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json<User>(firstSheet);

        const updatedData = jsonData.map((user) => {
            if (user.username === userData.username) {
                return { ...user, ...userData };
            }
            return user;
        });

        const newSheet = XLSX.utils.json_to_sheet(updatedData);
        workbook.Sheets[workbook.SheetNames[0]] = newSheet;

        const updatedFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
        const blobUpdated = new Blob([s2ab(updatedFile)], { type: 'application/octet-stream' });
        saveAs(blobUpdated, 'test_updated.xlsx'); // Saving as a new file
    };

    const s2ab = (s: string) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    };

    return (
        <div className="profile-popup">
            <div className="profile-popup-content">
            <button className="back-button" onClick={onClose}>
            ← <span className="back-icon"></span> {/* Cool space-themed icon */}
            </button> {/* Close Button */}
                <h1 className="profile-title">Profile</h1>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {editableUser && (
                    <>
                        <div className="profile-card">
                            <img
                                src={imagePreview as string}
                                alt="Profile"
                                width={100}
                                height={100}
                                className="profile-image"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="image-input"
                            />
                            <form onSubmit={handleSubmit}>
                                <div className="profile-detail">
                                    <label>Username:</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={editableUser.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="profile-detail">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editableUser.email}
                                        readOnly
                                    />
                                </div>
                                <div className="profile-detail">
                                    <label>Phone:</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={editableUser.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="profile-detail">
                                    <label>Joined Date:</label>
                                    <input
                                        type="text"
                                        name="joinedDate"
                                        value={editableUser.joinedDate}
                                        readOnly
                                    />
                                </div>
                                <button type="submit" className="update-button">
                                    Update Profile
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
