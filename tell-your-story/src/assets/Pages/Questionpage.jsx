import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Questionpage = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState([]);
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  });

  const { userID } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    async function getQuestions() {
      try {
        const { data } = await axios.get("http://localhost:5005/diary-prompts");
        setQuestion(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    getQuestions();
  }, []);

  //funtion to store answer
  const handleStoreAnswer = (e) => {
    setAnswers({ ...answers, [currentQuestionIndex]: e.target.value });
  };

  //Change the format of the date to submit
  function formateData() {
    const notes = Object.keys(answers).map((oneAnswer) => {
      return {
        diary_promptsId: question[oneAnswer].id,
        note: answers[oneAnswer],
      };
    });

    const finalData = {
      date: currentDate,
      userId: parseInt(userID),
      notes: notes,
    };
    return finalData;
  }

  // Function to submit

  async function submitData(e) {
    const dataToSubmit = formateData();
    console.log("data to submit", dataToSubmit);

    try {
      const { data } = await axios.post(
        "http://localhost:5005/days",
        dataToSubmit
      );
      nav(`/profile/${userID}`);
    } catch (err) {
      console.log(err);
    }
  }

  //function show next question

  const handleNextQuestion = () => {
    if (currentQuestionIndex < question.length - 1) {
      setcurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Well done for the day");
      console.log("All answers:", answers);
      submitData();
    }
  };

  // //function show previous question
  // const handlePrevQuestion = (e) => {
  //   if (currentQuestionIndex > 0) {
  //     setQuestion(question[currentQuestionIndex - 1]);
  //     setcurrentQuestionIndex(currentQuestionIndex - 1);
  //   }
  // };

  if (!question || question.length === 0) {
    return <p>loading ...</p>;
  }

  if (!question[currentQuestionIndex]) {
    return <p>current queestion loading</p>;
  }

  return (
    <div>
      <h2>Today is {currentDate}</h2>
      <h2>Question {currentQuestionIndex + 1} </h2>
      <h4>{question[currentQuestionIndex].title} </h4>

      <input
        type="text"
        value={answers[currentQuestionIndex] || ""}
        onChange={handleStoreAnswer}
        placeholder="Type your answer"
      ></input>

      <button onClick={handleNextQuestion}>Next Question</button>

      {/* <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous Question
        </button> */}
    </div>
  );
};

export default Questionpage;
