import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditDayNotes() {
  const { userID, dairyID } = useParams();
  const [day, setDay] = useState(null);
  const [diaryPrompts, setDiaryPrompts] = useState(null);
  const navigate = useNavigate();

  //const [notes, setNotes] = useState(null);

  const [note1, setNote1] = useState(null);
  const [note2, setNote2] = useState(null);
  const [note3, setNote3] = useState(null);
  const [note4, setNote4] = useState(null);
  const [note5, setNote5] = useState(null);
  const [note6, setNote6] = useState(null);
  const [note7, setNote7] = useState(null);
  const [note8, setNote8] = useState(null);

  useEffect(() => {
    async function getDairy() {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/days?userId=${userID}&date=${dairyID}`
        );

        const result = await axios.get(`http://localhost:5005/diary-prompts`);

        setDay(data[0]);
        setDiaryPrompts(result.data);

        /** madness **/
        setNote1({
          diary_promptsId: result.data[0].id,
          question: result.data[0].title,
          answer: data[0].notes[0].note,
        });
        setNote2({
          diary_promptsId: result.data[1].id,
          question: result.data[1].title,
          answer: data[0].notes[1].note,
        });
        setNote3({
          diary_promptsId: result.data[2].id,
          question: result.data[2].title,
          answer: data[0].notes[2].note,
        });
        setNote4({
          diary_promptsId: result.data[3].id,
          question: result.data[3].title,
          answer: data[0].notes[3].note,
        });
        setNote5({
          diary_promptsId: result.data[4].id,
          question: result.data[4].title,
          answer: data[0].notes[4].note,
        });
        setNote6({
          diary_promptsId: result.data[5].id,
          question: result.data[5].title,
          answer: data[0].notes[5].note,
        });
        setNote7({
          diary_promptsId: result.data[6].id,
          question: result.data[6].title,
          answer: data[0].notes[6].note,
        });
        setNote8({
          diary_promptsId: result.data[7].id,
          question: result.data[7].title,
          answer: data[0].notes[7].note,
        });
      } catch (err) {
        console.log(err);
      }
    }
    getDairy();
  }, []);

  async function handleSaveUpdates(e) {
    e.preventDefault();

    const updatedNotes = [
      { diary_promptsId: note1.diary_promptsId, note: note1.answer },
      { diary_promptsId: note2.diary_promptsId, note: note2.answer },
      { diary_promptsId: note3.diary_promptsId, note: note3.answer },
      { diary_promptsId: note4.diary_promptsId, note: note4.answer },
      { diary_promptsId: note5.diary_promptsId, note: note5.answer },
      { diary_promptsId: note6.diary_promptsId, note: note6.answer },
      { diary_promptsId: note7.diary_promptsId, note: note7.answer },
      { diary_promptsId: note8.diary_promptsId, note: note8.answer },
    ];

    try {
      const { data } = await axios.patch(
        `http://localhost:5005/days/${day.id}`,
        {
          notes: updatedNotes,
        }
      );
      navigate(`/profile/${day.userId}`);
    } catch (err) {
      console.log(err);
    }
  }

  if (!day || !diaryPrompts) {
    return <p>Loading... </p>;
  }

  return (
    <form className="edit-day-page" onSubmit={handleSaveUpdates}>
      <h1>
        Take a trip down to memory lane of <br />
        <span className="important">{day.date}</span>
      </h1>
      <div className="question-note-container">
        <h3>{note1.question}</h3>
        <textarea
          type="text"
          value={note1.answer}
          onChange={(e) => {
            setNote1({
              diary_promptsId: note1.diary_promptsId,
              question: note1.question,
              answer: e.target.value,
            });
          }}
        />
      </div>
      <div className="question-note-container">
        <h3>{note2.question}</h3>
        <textarea
          type="text"
          value={note2.answer}
          onChange={(e) => {
            setNote2({
              diary_promptsId: note2.diary_promptsId,
              question: note2.question,
              answer: e.target.value,
            });
          }}
        />
      </div>
      <div className="question-note-container">
        <h3>{note3.question}</h3>
        <textarea
          type="text"
          value={note3.answer}
          onChange={(e) => {
            setNote3({
              diary_promptsId: note3.diary_promptsId,
              question: note3.question,
              answer: e.target.value,
            });
          }}
        />
      </div>
      <div className="question-note-container">
        <h3>{note4.question}</h3>
        <textarea
          type="text"
          value={note4.answer}
          onChange={(e) => {
            setNote4({
              diary_promptsId: note4.diary_promptsId,
              question: note4.question,
              answer: e.target.value,
            });
          }}
        />
      </div>
      <div className="question-note-container">
        <h3>{note5.question}</h3>
        <textarea
          type="text"
          value={note5.answer}
          onChange={(e) => {
            setNote5({
              diary_promptsId: note5.diary_promptsId,
              question: note5.question,
              answer: e.target.value,
            });
          }}
        />
      </div>
      <div className="question-note-container">
        <h3>{note6.question}</h3>
        <textarea
          type="text"
          value={note6.answer}
          onChange={(e) => {
            setNote6({
              diary_promptsId: note6.diary_promptsId,
              question: note6.question,
              answer: e.target.value,
            });
          }}
        />
      </div>
      <div className="question-note-container">
        <h3>{note7.question}</h3>
        <textarea
          type="text"
          value={note7.answer}
          onChange={(e) => {
            setNote7({
              diary_promptsId: note7.diary_promptsId,
              question: note7.question,
              answer: e.target.value,
            });
          }}
        />
      </div>
      <div className="question-note-container">
        <h3>{note8.question}</h3>
        <textarea
          type="text"
          value={note8.answer}
          onChange={(e) => {
            setNote8({
              diary_promptsId: note8.diary_promptsId,
              question: note8.question,
              answer: e.target.value,
            });
          }}
        />
      </div>

      <div className="btn-container">
        <Link to={`/profile/${userID}`}>
          <button className="not-so-prominent-btn">Back</button>
        </Link>
        <button type="submit" className="prominent-btn">
          Save
        </button>
      </div>
    </form>
  );
}

export default EditDayNotes;
