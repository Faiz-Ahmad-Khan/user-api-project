import React from 'react';

function UserList({ users, setSelectedUser }) {
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="user-item" onClick={() => handleUserSelect(user)}>
            <div className="user-details">
              <div><strong>Name:</strong> {user.name}</div>
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Gender:</strong> {user.gender}</div>
              <div><strong>Status:</strong> {user.status}</div>
              <div><strong>Created At:</strong> {user.createdAt}</div>
              <div><strong>Updated At:</strong> {user.updatedAt}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
