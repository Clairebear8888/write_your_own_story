import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signuppage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  function handleCreateUser(e) {
    e.preventDefault();
    const newUser = {
      name,
      email,
      isAdmin,
      daysIds: [],
    };

    async function addNewUser() {
      try {
        const { data } = await axios.post(
          "http://localhost:5005/users",
          newUser
        );
        navigate("/Profile");
      } catch (error) {
        console.log(error);
      }
    }
    addNewUser();
  }

  return (
    <div className="sign-up-page">
      <h1>Welcome to Write your own story</h1>
      <form onSubmit={handleCreateUser}>
        <div className="inputs">
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Are you an Admin?
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </label>
        </div>
        <button>Create profile</button>
      </form>
    </div>
  );
};

export default Signuppage;
