import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Profilepage = () => {
  const { daysstate, setDaysstate } = useState();
  useEffect(() => {
    async function getAllDiary() {
      try {
        const { data } = await axios("http://localhost:5005/days");
        console.log(data);
        setDaysstate(data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllDiary();
  }, []);
  return (
    <div>
      <p>this is profile page</p>
      {daysstate.map((oneday) => {
        return (
          <div>
            <H3> oneday.date</H3>
          </div>
        );
      })}
    </div>
  );
};

export default Profilepage;
