import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Profilepage = () => {
<<<<<<< HEAD
  const [daysState, setDaysState] = useState([]);
  useEffect(() => {
    async function getAllDiary() {
      try {
        const { data } = await axios("http://localhost:5005/days");
        console.log(data);
=======
  const { userID } = useParams();

  const [daysState, setDaysState] = useState([]);
  const [userState, setuserState] = useState([]);

  useEffect(() => {
    async function getAllDiary() {
      try {
        const { data } = await axios(
          `http://localhost:5005/days?userId=${userID}`
        );

>>>>>>> claireBranch
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
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    getUsername();
  }, [userID]);
  return (
    <div>
<<<<<<< HEAD
      <p>this is profile page</p>
=======
      <p>Good to see you, {userState.name}</p>
>>>>>>> claireBranch
      {daysState.map((oneday) => {
        return (
          <div key={oneday.id}>
            <h3> {oneday.date}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Profilepage;
