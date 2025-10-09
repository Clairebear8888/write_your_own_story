import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../Components/config/config";

function AdminPage() {
  const [users, setUsers] = useState(null);
  const location = useLocation();
  const { loggedUserId } = location.state;

  useEffect(() => {
    async function getAllUsers() {
      const { data } = await axios.get(
        `${API_URL}/users?id_ne=${loggedUserId}`
      );
      setUsers(data);
    }

    getAllUsers();
  }, []);

  async function handleDeleteUser(userId) {
    try {
      const { data } = await axios.delete(`${API_URL}/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.log(error);
    }
  }

  if (!users) return <div>Loading....</div>;

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <div className="user-container">
        {users.map((user) => {
          return (
            <div className="user-card" key={user.id}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              {user.isAdmin && <p className="admin-text">Admin</p>}
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminPage;
