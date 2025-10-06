import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function AdminPage() {
  const [users, setUsers] = useState(null);
  const location = useLocation();
  const { loggedUserId } = location.state;

  useEffect(() => {
    async function getAllUsers() {
      const { data } = await axios.get(
        `http://localhost:5005/users?id_ne=${loggedUserId}`
      );
      setUsers(data);
    }

    getAllUsers();
  }, []);

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
              <button>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminPage;
