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
  return (
    <div>
      <p>Good to see you, {userState.name}</p>
      {daysState.map((oneday) => {
        return (
          <div key={oneday.id}>
            <Link to={`/profile/${userID}/${oneday.date}`}>
              <button> {oneday.date}</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Profilepage;
