import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Profilepage = () => {
  const [daysState, setDaysState] = useState([]);
  useEffect(() => {
    async function getAllDiary() {
      try {
        const { data } = await axios("http://localhost:5005/days");
        console.log(data);
        setDaysState(data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllDiary();
  }, []);
  return (
    <div>
      <p>this is profile page</p>
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
