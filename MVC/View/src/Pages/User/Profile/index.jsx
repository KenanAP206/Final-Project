import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import Card from '../../../Components/User/Card1/index'

const ProfilePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        role: '',
        image: '',
        id: '',
        description: '',
        favorites: []
    });
    
    const [isModalOpen, setIsModalOpen] = useState({
        profile: false,
        email: false,
        password: false,
        language: false,
        birth: false
    });
    
  
    const EditModal = ({ isOpen, onClose, title, values, onSave, config }) => {
        const [inputValues, setInputValues] = useState(values);
        
        if (!isOpen) return null;

        const handleSave = () => {
            if (typeof values === 'string') {
                onSave(inputValues);
            } else {
                onSave(inputValues);
            }
            onClose();
        };
        
        if (typeof values === 'string') {
            return (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{title}</h3>
                        <div className="modal-input-group">
                            <input
                                type={config.type || 'text'}
                                value={inputValues}
                                onChange={(e) => setInputValues(e.target.value)}
                                className="modal-input"
                            />
                        </div>
                        <div className="modal-buttons">
                            <button className="save-button" onClick={handleSave}>Save</button>
                            <button className="cancel-button" onClick={onClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h3>{title}</h3>
                    {config.map((field) => (
                        <div key={field.name} className="modal-input-group">
                            <label>{field.label}</label>
                            <input
                                type={field.type}
                                value={inputValues[field.name]}
                                onChange={(e) => setInputValues(prev => ({
                                    ...prev,
                                    [field.name]: e.target.value
                                }))}
                                placeholder={field.placeholder}
                                className="modal-input"
                            />
                        </div>
                    ))}
                    <div className="modal-buttons">
                        <button className="save-button" onClick={handleSave}>Save</button>
                        <button className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    };

    const FavoritesModal = ({ isOpen, onClose, favorites }) => {
        const [selectedShows, setSelectedShows] = useState([]);

        if (!isOpen) return null;

        const handleToggleShowSelection = (showId) => {
            setSelectedShows(prevSelected => 
                prevSelected.includes(showId) 
                    ? prevSelected.filter(id => id !== showId) 
                    : [...prevSelected, showId]
            );
        };

        const handleRemoveFavorites = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:3000/users/${userData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        favorites: userData.favorites.filter(id => !selectedShows.includes(id))
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to remove favorites');
                }

                setFavoriteShows(prevShows => prevShows.filter(show => !selectedShows.includes(show._id)));
                setSelectedShows([]);
            } catch (error) {
                console.error('Error removing favorites:', error);
            }
        };

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h3>Manage Favorite Shows</h3>
                    {favoriteShows.length === 0 ? (
                        <b>No favorite shows available.</b>
                    ) : (
                        <ul className='scrolllist'>
                            {favoriteShows.map((show) => (
                                <li key={show._id} className="favorite-show">
                                    <Card 
                                        image={show.image} 
                                        name={show.name} 
                                        category={show.category} 
                                        type={show.type} 
                                        year={show.year} 
                                        episode={show.episode} 
                                        rating={show.rating} 
                                        id={show._id} 
                                    />
                                    <div className="checkbox-container">
                                        <input 
                                            type="checkbox" 
                                            id={`checkbox-${show._id}`} 
                                            checked={selectedShows.includes(show._id)} 
                                            onChange={() => handleToggleShowSelection(show._id)} 
                                        />
                                        <label htmlFor={`checkbox-${show._id}`}>{show.name}</label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="modal-buttons">
                        <button className="remove-favorite-button" onClick={handleRemoveFavorites}>Remove Selected</button>
                        <button className="cancel-button" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/profile');
                return;
            }

            try {
                const tokenParts = token.split('.');
                const payload = JSON.parse(atob(tokenParts[1]));
                const userId = payload.userId;

                const response = await fetch(`http://localhost:3000/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const { data } = await response.json();
                setUserData({
                    username: data.username,
                    email: data.email,
                    role: data.role,
                    image: data.image,
                    id: data._id || data.id,
                    description: data.description,
                    favorites: data.favorites || []
                });
            } catch (error) {
                console.error('Error:', error);
                navigate('/profile');
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleUpdate = async (updatedData) => {
        const token = localStorage.getItem('token');
        try {
            if (updatedData.password) {
                const response = await fetch(`http://localhost:3000/users/${userData.id}/reset-password`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newPassword: updatedData.password })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Password update failed');
                }

                alert('Password updated successfully!');
            } else {
                const response = await fetch(`http://localhost:3000/users/${userData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Update failed');
                }

                const { data } = await response.json();
                setUserData(prev => ({
                    ...prev,
                    ...data
                }));
                alert('Profile updated successfully!');
            }
        } catch (error) {
            alert('Failed to update profile: ' + error.message);
        }
    };

    const [favorites, setFavorites] = useState([]);
    const [favoriteShows, setFavoriteShows] = useState([]);

    useEffect(() => {
        const fetchFavoriteShows = async () => {
            if (userData.favorites && userData.favorites.length > 0) {
                try {
                    const token = localStorage.getItem('token');
                    const responses = await Promise.all(
                        userData.favorites.map(id =>
                            axios.get(`http://localhost:3000/shows/${id}`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                        )
                    );

                    const shows = responses.map(res => res.data.data);
                    setFavoriteShows(shows);
                } catch (error) {
                    console.error('Error fetching favorite shows:', error);
                }
            } else {
                console.log('No favorites found or favorites is empty.');
            }
        };

        fetchFavoriteShows();
    }, [userData.favorites]);

    return (
        <div className="profile-container">
            <div className="profile-card">
                <button 
                    className="prof-edit edit-button"
                    onClick={() => setIsModalOpen(prev => ({ ...prev, profile: true }))}
                >
                    Edit Profile
                </button>
                <img 
                    src={userData.image || "https://movie.soulknightweb.com/images/user/user.png"} 
                    alt="Profile" 
                    className="profile-image" 
                />
                <div className="profile-header">
                    <h2>{userData.username}</h2>
                </div>
                <div className="about-user">
                    <h3>About User</h3>
                    <hr />
                    <p>{userData.description}</p>
                </div>
            </div>
            <div className="profile-details">
                <div className="personal-details">
                    <h3>Personal Details</h3>
                    <hr />
                    <div className="detail-item">
                        <label>Email*</label>
                        <p>{userData.email}</p>
                        <button 
                            className="edit-button"
                            onClick={() => setIsModalOpen(prev => ({ ...prev, email: true }))}
                        >
                            Edit
                        </button>
                    </div>
                    <div className="detail-item">
                        <label>Password*</label>
                        <p>**********</p>
                        <button 
                            className="edit-button"
                            onClick={() => setIsModalOpen(prev => ({ ...prev, password: true }))}
                        >
                            Edit
                        </button>
                    </div>
                    <div className="detail-item">
                        <label>Favorite Shows</label>
                        <p>{favoriteShows.length} shows</p>
                        <button 
                            className="edit-button"
                            onClick={() => setIsModalOpen(prev => ({ ...prev, favorites: true }))}
                        >
                            Manage
                        </button>
                    </div>
                    <div className="detail-item">
                        <label>Language*</label>
                        <p>Not specified</p>
                        <button 
                            className="edit-button"
                            onClick={() => setIsModalOpen(prev => ({ ...prev, language: true }))}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
            <div className="billing-details">
                    <h3>Billing Details</h3>
                    <hr />
                    <p>Your next billing date is not specified.</p>
                    <button className="cancel-button">Cancel Membership</button>
                    <div className="plan-type">
                        <label>Plan Type</label>
                        <p>Not specified</p>
                    </div>
                    <button className="edit-button">Update Payment info</button>
                </div>
            {/* Modals */}
            <EditModal 
                isOpen={isModalOpen.profile}
                onClose={() => setIsModalOpen(prev => ({ ...prev, profile: false }))}
                title="Edit Profile"
                values={{
                    username: userData.username,
                    description: userData.description || '',
                    image: userData.image || ''
                }}
                config={[
                    {
                        name: 'username',
                        type: 'text',
                        label: 'Username',
                        placeholder: 'Enter username'
                    },
                    {
                        name: 'description',
                        type: 'text',
                        label: 'Description',
                        placeholder: 'Enter description'
                    },
                    {
                        name: 'image',
                        type: 'text',
                        label: 'Profile Image URL',
                        placeholder: 'Enter image URL'
                    }
                ]}
                onSave={(values) => handleUpdate(values)}
            />

            <EditModal 
                isOpen={isModalOpen.email}
                onClose={() => setIsModalOpen(prev => ({ ...prev, email: false }))}
                title="Edit Email"
                values={userData.email}
                config={{ type: 'email' }}
                onSave={(value) => handleUpdate({ email: value })}
            />

            <EditModal 
                isOpen={isModalOpen.password}
                onClose={() => setIsModalOpen(prev => ({ ...prev, password: false }))}
                title="Reset Password"
                values=""
                config={{ type: 'password' }}
                onSave={(value) => handleUpdate({ password: value })}
            />

            <EditModal 
                isOpen={isModalOpen.birth}
                onClose={() => setIsModalOpen(prev => ({ ...prev, birth: false }))}
                title="Edit Birth Date"
                values=""
                config={{ type: 'date' }}
                onSave={(value) => handleUpdate({ dateOfBirth: value })}
            />

            <EditModal 
                isOpen={isModalOpen.language}
                onClose={() => setIsModalOpen(prev => ({ ...prev, language: false }))}
                title="Edit Language"
                values=""
                config={{ type: 'text' }}
                onSave={(value) => handleUpdate({ language: value })}
            />

            <FavoritesModal 
                isOpen={isModalOpen.favorites}
                onClose={() => setIsModalOpen(prev => ({ ...prev, favorites: false }))}
                favorites={favoriteShows}
            />
              
        </div>
    );
};

export default ProfilePage;
