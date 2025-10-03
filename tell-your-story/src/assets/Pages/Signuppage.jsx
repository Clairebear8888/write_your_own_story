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
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>
          Are you an Admin?
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <br />
        </label>
        <button>Create profile</button>
      </form>
    </div>
  );
};

export default Signuppage;
