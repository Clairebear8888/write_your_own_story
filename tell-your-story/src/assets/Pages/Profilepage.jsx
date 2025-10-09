import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Authcontext";
import { API_URL } from "../Components/config/config";

const Profilepage = () => {
  const { isLoggedIn, setisLoggedin, userName, setUserName } =
    useContext(AuthContext);
  const { userID } = useParams();

  const [daysState, setDaysState] = useState([]);
  const [userState, setuserState] = useState([]);

  useEffect(() => {
    async function getAllDiary() {
      try {
        const { data } = await axios(`${API_URL}/days?userId=${userID}`);
        setDaysState(data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllDiary();
  }, [userID]);

  useEffect(() => {
    async function getUsername() {
      try {
        const { data } = await axios.get(`${API_URL}/users?id=${userID}`);
        setuserState(data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getUsername();
  }, [userID]);

  async function handleDeleteDay(dayToRemoveId) {
    console.log("deleting");
    try {
      const { data } = await axios.delete(`${API_URL}/days/${dayToRemoveId}`);
      setDaysState(daysState.filter((day) => day.id !== dayToRemoveId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="profile-page">
      <h1>How has your day been, {userState.name}?</h1>
      <p>Here is Your Story so far.</p>
      <button className="prominent-btn">
        <Link to={`/questions/${userID}`}>＋ Journal Today!</Link>
      </button>
      <div className="day-container">
        {daysState.map((oneday) => {
          return (
            <div className="day-card" key={oneday.id}>
              <h2>{oneday.date}</h2>
              <div className="actions-container">
                <button id="main-button">
                  <Link to={`/profile/${userID}/${oneday.date}`}>
                    See My Day
                  </Link>
                </button>

                <button id="edit-button">
                  <Link to={`/profile/${userID}/${oneday.date}/edit`}>
                    Edit
                  </Link>
                </button>
                <button
                  id="delete-button"
                  onClick={() => {
                    handleDeleteDay(oneday.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profilepage;
