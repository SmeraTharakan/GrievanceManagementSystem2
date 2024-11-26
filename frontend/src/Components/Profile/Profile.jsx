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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await api.get(`/api/users/${userId}`);
                setUserDetails(response.data);
                setNewUsername(response.data.username)
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

    const handleAccountDeletion = async () => {
        try {
            await api.delete(`/api/users/delete/${userId}`);
            console.log('Account deleted successfully');
            localStorage.clear();
            window.location.href = "/login"; 
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    return (
            <div className="container" >
                <div className='line'>
                <h2>Profile</h2>
                </div>
                <div className="profile-detail">
                    <h3>Account Info</h3>
                    <hr />
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
                </div>
                <div className="profile-detail">
                    <h3>Change Password</h3>
                    <hr />
                    <p>Update your password to keep your account secure. Make sure your new password is strong and not easy to guess.</p>
                    <button onClick={() => setShowPasswordModal(true)}>Change Password</button>
                </div>

                <div className="profile-detail">
                    <h3>Delete Your Account</h3>
                    <hr />
                    <p>
                        If you choose to delete your account, all your data will be permanently removed, and you will not be able to recover it. 
                        Please proceed with caution.
                    </p>
                    <button className="delete-btn" onClick={() => setShowDeleteModal(true)}>Delete Account</button>
                </div>
                {showPasswordModal && (
                        <div className="overlay">
                            <div className="password-content">
                                <div onClick={() => setShowPasswordModal(false)} className='close'>&#x2715;</div>
                                <h3>Change Password</h3>
                                <div className='password-update'>
                                    <div>
                                        <label>Current Password:</label>
                                        <div>
                                        <input
                                            type="password"
                                            name="myInput1"
                                            id="myInput1"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            autoComplete="current-password"
                                        />
                                        </div>
                                    </div>
                                    <div>
                                        <label>New Password:</label>
                                        <div>
                                        <input
                                            type="password"
                                            name="myInput2"
                                            id="myInput2"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            autoComplete="none"
                                        />
                                        </div>
                                    </div>
                                    <div>
                                        <label>Confirm New Password:</label>
                                        <div>
                                        <input
                                            type="password"
                                            name="myInput3"
                                            id="myInput3"
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            autoComplete="none"
                                        />
                                        </div>
                                    </div>
                                </div>
                                <div className='bi-button'>
                                    <button onClick={handlePasswordReset}>Reset Password</button>
                                    <button onClick={() => setShowPasswordModal(false)}>Cancel</button>
                                </div>
                                
                            </div>
                        </div>
                )} 
                {showDeleteModal && (
                <div className="overlay">
                    <div className="delete-content">
                        <div onClick={() => setShowDeleteModal(false)} className='close'>&#x2715;</div>
                        <p style={{textAlign: 'center'}}>Are you sure you want to delete your account?</p>
                        <div className='bi-button'>
                            <button onClick={handleAccountDeletion}>Yes, Delete</button>
                            <button onClick={() => setShowDeleteModal(false)}>Keep account</button>
                        </div>
                    </div>
                </div>
                )} 
            </div>
    );
};

export default Profile;