import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoImg from "../logo.png";
import { AuthContext } from "../../Context/Authcontext";

const Navbar = () => {
  const { isLoggedIn, setisLoggedin, userName, setUserName } =
    useContext(AuthContext);

  console.log(isLoggedIn);

  return (
    <header>
      <Link to="/">
        <img alt="logo" src={LogoImg} />
      </Link>

      {isLoggedIn === true ? (
        <nav>
          <h4>Good to see you today, {userName}</h4>
          <button
            onClick={() => {
              setisLoggedin(false);
            }}
          >
            Logout
          </button>
        </nav>
      ) : (
        <nav>
          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? "selected" : "")}
          >
            Sign up
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "selected" : "")}
          >
            Log in{" "}
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) => (isActive ? "selected" : "")}
          >
            About us{" "}
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
