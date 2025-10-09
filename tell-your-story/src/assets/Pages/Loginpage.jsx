import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Authcontext";
import { useContext } from "react";

const LogInPage = () => {
  const { isLoggedIn, setIsLoggedIn, userName, setUserName, setUserId } =
    useContext(AuthContext);

  console.log(userName);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleLogIn(e) {
    e.preventDefault();

    async function tryToLogIn() {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/users?name=${name}&email=${email}`
        );
        const user = data[0];
        if (user === undefined) {
          if (confirm("Sorry, can't find you! Would you like to Sing Up?")) {
            navigate("/signup"); //if press OK
          } else {
            window.location.reload();
            //if press Cancel, just reload the page
          }
        } else {
          if (user.isAdmin)
            navigate("/admin", { state: { loggedUserId: user.id } });
          else {
            navigate(`/profile/${user.id}`);
            await setIsLoggedIn(true);
            await setUserName(name);
            await setUserId(user.id);
            console.log(name, isLoggedIn);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    tryToLogIn();
  }

  return (
    <div className="log-in-page">
      <h1>Welcome back to Write your own story</h1>
      <form>
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
        </div>

        <button onClick={handleLogIn}>Log In</button>
      </form>
    </div>
  );
};

export default LogInPage;
