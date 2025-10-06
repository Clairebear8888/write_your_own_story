import React from "react";
import { Link, NavLink } from "react-router-dom";
import LogoImg from "../logo.png";

const Navbar = () => {
  return (
    <header>
      <Link to="/">
        <img alt="logo" src={LogoImg} />
      </Link>
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
    </header>
  );
};

export default Navbar;
