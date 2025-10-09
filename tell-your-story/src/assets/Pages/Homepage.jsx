import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import HopeImg from "../home-page-image.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Authcontext";

const Homepage = () => {
  const { isLoggedIn, userId } = useContext(AuthContext);

  return (
    <div>
      <div className="header-image-container">
        <section>
          <h1>Echo Dairy </h1>
          <h2>An AI powered journal that listens and talks back to you</h2>
          <div className="btn-container">
            <Link to="/signup">
              <button id="sign-up-btn">Sign Up</button>
            </Link>
            <Link to={isLoggedIn ? `/profile/${userId}` : "/login"}>
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
