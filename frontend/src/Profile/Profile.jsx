import React, { useState, useEffect } from 'react';
import api from '../Api/api.jsx';
import editIcon from '../assets/edit.png';  
import tickIcon from '../assets/tick.png';  
import './Profile.css'

const Profile = () => {
    const userId = localStorage.getItem("userId"); 
    const [userDetails, setUserDetails] = useState({
        userId: '',
        username: '',
        password: '',
        email: '',
    });

    const [editingField, setEditingField] = useState(null); 
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [refresh, setRefresh] = useState(false);

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

    const toggleEdit = (field) => {
        setEditingField(field);
        if (field === 'username') setNewUsername(userDetails.username);
        if (field === 'password') setNewPassword(userDetails.password);
    };

    const saveField = async (field) => {
        try {
            let updatedValue, endpoint;

            if (field === 'username') {
                updatedValue = newUsername;
                endpoint = `/api/users/updateUsername/${userId}`;
            } else if (field === 'password') {
                updatedValue = newPassword;
                endpoint = `/api/users/updatePassword/${userId}`;
            }

            const response = await api.put(endpoint, updatedValue, {
                headers: { "Content-Type": "text/plain" }
            });
            
            console.log(`Successfully updated ${field}:`, response.data);
            setRefresh(!refresh);
            setEditingField(null);
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
        }
    };

    return (
        <div className='fbox'>
        <div className="profile-container" >
            <h2>Profile</h2>
            <div className="profile-detail">
                <p><strong>User ID :</strong>{userId}</p>
                <p><strong>Email :</strong> {userDetails.email}</p>

                <div className="editable-field">
                    <label><strong>Username :</strong></label>
                    {editingField === 'username' ? (
                        <span>
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                style={{ marginRight: '10px' }}
                            />
                            <img
                                src={tickIcon}
                                alt="Save"
                                onClick={() => saveField('username')}
                                style={{ cursor: 'pointer', width: '20px' }}
                            />
                        </span>
                    ) : (
                        <span>
                            {userDetails.username}
                            <img
                                src={editIcon}
                                alt="Edit"
                                onClick={() => toggleEdit('username')}
                                style={{ cursor: 'pointer', marginLeft: '10px', width: '20px' }}
                            />
                        </span>
                    )}
                </div>

                <div className="editable-field">
                    <label><strong>Password :</strong></label>
                    {editingField === 'password' ? (
                        <span>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                style={{ marginRight: '10px' }}
                            />
                            <img
                                src={tickIcon}
                                alt="Save"
                                onClick={() => saveField('password')}
                                style={{ cursor: 'pointer', width: '20px' }}
                            />
                        </span>
                    ) : (
                        <span>
                            {"*".repeat(5)}
                            <img
                                src={editIcon}
                                alt="Edit"
                                onClick={() => toggleEdit('password')}
                                style={{ cursor: 'pointer', marginLeft: '10px', width: '20px' }}
                            />
                        </span>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;
