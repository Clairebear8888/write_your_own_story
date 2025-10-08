import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailDairypage = () => {
  const [singleDairyState, setsingleDairyState] = useState(null);

  const { userID, dairyID } = useParams();
  const [diaryPrompts, setDiaryPrompts] = useState(null);

  useEffect(() => {
    async function getDairy() {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/days?userId=${userID}&date=${dairyID}`
        );

        const result = await axios.get(`http://localhost:5005/diary-prompts`);
        setDiaryPrompts(result.data);

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
    <div className="day-page">
      <h1>Take a trip down to memory lane of {singleDairyState.date}</h1>
      {singleDairyState.notes.map((oneNote, index) => {
        return (
          <div
            className="question-note-container"
            key={oneNote.diary_promptsId}
          >
            <h3>{diaryPrompts[index].title}</h3>
            <p>{oneNote.note}</p>
          </div>
        );
      })}
      <Link to={`/profile/${userID}`}>
        <button className="prominent-btn">Back</button>
      </Link>
    </div>
  );
};

export default DetailDairypage;
