import React, { useState } from 'react';
import Axios from 'axios';

function EditUser({ user, onUpdate }) {
    const [updatedUser, setUpdatedUser] = useState({ ...user });
    const [errorMessage, setErrorMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({
            ...updatedUser,
            [name]: value,
        });
    };

    const handleSave = async () => {
        try {
            const response = await Axios.put(`/api/users/update-user/${updatedUser.id}`, updatedUser);
            if (response.status === 200) {
                onUpdate(updatedUser);
                setErrorMessage(null); // Clear any previous error message
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred while saving the user data.');
            }
        }
    };

    return (
        <div className="edit-user-container">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div>
                <label>Name: </label>
                <input
                    type="text"
                    name="name"
                    value={updatedUser.name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Email: </label>
                <input
                    type="text"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Gender: </label>
                <input
                    type="text"
                    name="gender"
                    value={updatedUser.gender}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Status: </label>
                <input
                    type="text"
                    name="status"
                    value={updatedUser.status}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default EditUser;
