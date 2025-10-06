import React from "react";
import Navbar from "../Components/Navbar";
import HopeImg from "../home-page-image.png";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <div className="header-image-container">
        <section>
          <h1>Write your own story </h1>
          <h2>Record your day and access your inner self </h2>
          <div className="btn-container">
            <Link to="/signup">
              <button id="sign-up-btn">Sign Up</button>
            </Link>
            <Link to="/login">
              <button id="log-in-btn">To my profile</button>
            </Link>
          </div>
        </section>
        <img alt="home-page-image" src={HopeImg} />
      </div>
    </div>
  );
};

export default Homepage;
