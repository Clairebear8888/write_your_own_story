import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailDairypage = () => {
  const [singleDairyState, setsingleDairyState] = useState(null);

  const { userID, dairyID } = useParams();
  console.log(userID);
  console.log(dairyID);

  useEffect(() => {
    async function getDairy() {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/days?userId=${userID}&date=${dairyID}`
        );

        console.log(data);
        setsingleDairyState(data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getDairy();
  }, []);
  if (!singleDairyState) {
    return <p>Loading </p>;
  }
  return (
    <div>
      <h3>Take a trip down to memeory lane of {singleDairyState.date}</h3>
      {singleDairyState.notes.map((oneNote) => {
        return <h5> {oneNote.note}</h5>;
      })}
    </div>
  );
};

export default DetailDairypage;
