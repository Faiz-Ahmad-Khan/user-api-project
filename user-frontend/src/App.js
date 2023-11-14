import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import UserList from './UserList';
import EditUser from './EditUser';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users/fetch-users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`/api/users/update-user/${updatedUser.id}`, updatedUser);

      if (response.status === 200) {
        // Update the local users state with the updated user data
        setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      }
    } catch (error) {
      console.error(error);
    }

    setSelectedUser(null);
  };

  return (
    <div className="app-container">
      <h1>User Management System</h1>
      <div className="user-management-container">
        <UserList users={users} setSelectedUser={setSelectedUser} />
        {selectedUser && <EditUser user={selectedUser} onUpdate={handleUpdateUser} />}
      </div>
    </div>
  );
}

export default App;
