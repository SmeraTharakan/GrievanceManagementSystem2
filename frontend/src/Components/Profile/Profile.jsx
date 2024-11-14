import React, { useState, useEffect } from 'react';
import api from '../../Api/api.jsx';
import edit from '../../assets/edit.png';  
import tick from '../../assets/tick.png';  
import './Profile.css'

const Profile = () => {
    const userId = localStorage.getItem("userId"); 
    const [userDetails, setUserDetails] = useState({
        userId: '',
        username: '',
        password: '',
        email: '',
    });

    const [isEditingField, setIsEditingField] = useState(false); 
    const [newUsername, setNewUsername] = useState('');
    const [refresh, setRefresh] = useState(false);

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await api.get(`/api/users/${userId}`);
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [userId,refresh]);

    const saveUsername = async () => {
        try {

            const response = await api.put(`/api/users/updateUsername/${userId}`, newUsername, {
                headers: { "Content-Type": "text/plain" }
            });
            
            console.log(`Successfully updated username:`, response.data);
            setRefresh(!refresh);
            setIsEditingField(false);
        } catch (error) {
            console.error(`Error updating :`, error);
        }
    };

    const handlePasswordReset = async () => {
        if (newPassword !== confirmNewPassword) {
            alert("New passwords do not match");
            return;
        }

        try {
            const response = await api.put(`/api/users/updatePassword/${userId}`, {
                oldPassword: currentPassword,
                newPassword: newPassword
            });
            console.log('Password updated successfully:', response.data);
            setShowPasswordModal(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    return (
        <div className='fbox'>
            <div className="profile-container" >
                <div className='line'>
                <h2>Profile</h2>
                </div>
                <div className="profile-detail">
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td><strong>User ID :</strong></td>
                                <td>{userId}</td>
                            </tr>
                            <tr>
                                <td><strong>Email :</strong></td>
                                <td>{userDetails.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Username :</strong></td>
                                <td>
                                    {isEditingField ? (
                                        <>
                                            <input
                                                type="text"
                                                value={newUsername}
                                                onChange={(e) => setNewUsername(e.target.value)}
                                                style={{ marginRight: '10px' }}
                                            />
                                            <img
                                                src={tick}
                                                alt="Save"
                                                onClick={() => saveUsername()}
                                                style={{ cursor: 'pointer', width: '20px' }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {userDetails.username}
                                            <img
                                                src={edit}
                                                alt="Edit"
                                                onClick={() => setIsEditingField(true)}
                                                style={{ cursor: 'pointer', marginLeft: '40px', width: '20px' }}
                                            />
                                        </>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={() => setShowPasswordModal(true)}>Change Password</button>
                </div>
                {showPasswordModal && (
                        <div className="profile-overlay">
                            <div className="profile-content">
                            <div onClick={() => setShowPasswordModal(false)} className='close'>X</div>
                                <h3>Change Password</h3>
                                <div className='profile-update'>
                                    <div>
                                        <label>Current Password:</label>
                                        <div>
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                        </div>
                                    </div>
                                    <div>
                                        <label>New Password:</label>
                                        <div>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        </div>
                                    </div>
                                    <div>
                                        <label>Confirm New Password:</label>
                                        <div>
                                        <input
                                            type="password"
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        />
                                        </div>
                                    </div>
                                </div>
                                <button className="reset-btn" onClick={handlePasswordReset}>Reset Password</button>
                            </div>
                        </div>
                )}  
            </div>
        </div>
    );
};

export default Profile;
