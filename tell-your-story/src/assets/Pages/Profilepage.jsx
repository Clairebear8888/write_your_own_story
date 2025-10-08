import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Profilepage = () => {
  const { userID } = useParams();

  const [daysState, setDaysState] = useState([]);
  const [userState, setuserState] = useState([]);

  useEffect(() => {
    async function getAllDiary() {
      try {
        const { data } = await axios(
          `http://localhost:5005/days?userId=${userID}`
        );
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
        const { data } = await axios.get(
          `http://localhost:5005/users?id=${userID}`
        );
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
      const { data } = await axios.delete(
        `http://localhost:5005/days/${dayToRemoveId}`
      );
      setDaysState(daysState.filter((day) => day.id !== dayToRemoveId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="profile-page">
      <h1>Good to see you, {userState.name}</h1>
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
                <button>
                  <Link to={`/profile/${userID}/${oneday.date}`}>
                    See My Day
                  </Link>
                </button>

                <button>
                  <Link to={`/profile/${userID}/${oneday.date}/edit`}>
                    Edit
                  </Link>
                </button>
                <button
                  onClick={() => {
                    handleDeleteDay(oneday.id);
                  }}
                >
                  Delete Day
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
