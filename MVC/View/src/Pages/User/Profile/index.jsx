import React from 'react';
import './Profile.css';

const ProfilePage = () => {
    return (
        <div className="profile-container">
            <div className="profile-card">
            <button className="prof-edit edit-button">Edit</button>
            <img src="https://movie.soulknightweb.com/images/user/user.png" alt="Profile" className="profile-image" />
                <div className="profile-header">
                
                    <h2>Name: John Doe</h2>
                </div>
                <div className="about-user">
                    <h3>About User</h3>
                    <hr />
                    <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
          <div className="profile-details">
          <div className="personal-details">
                <h3>Personal Details</h3>
                <hr />
                <div className="detail-item">
                    <label>Email*</label>
                    <p>example@domain.com</p>
                    <button className="edit-button">Edit</button>
                </div>
                <div className="detail-item">
                    <label>Password*</label>
                    <p>**********</p>
                    <button className="edit-button">Edit</button>
                </div>
                <div className="detail-item">
                    <label>Date of Birth*</label>
                    <p>21/01/1999</p>
                    <button className="edit-button">Edit</button>
                </div>
                <div className="detail-item">
                    <label>Language*</label>
                    <p>English</p>
                    <button className="edit-button">Edit</button>
                </div>
            </div>
            <div className="billing-details">
                <h3>Billing Details</h3>
                <hr />
                <p>Your next billing date is 12 June 2027.</p>
                <button className="cancel-button">Cancel Membership</button>
                <div className="plan-type">
                    <label>Plan Type</label>
                    <p>Premium</p>
                </div>
                <button className="edit-button">Update Payment info</button>
            </div>
          </div>
        </div>
    );
};

export default ProfilePage;