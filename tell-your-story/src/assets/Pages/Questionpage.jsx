import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";
import { API_URL } from "../Components/config/config";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const Questionpage = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState([]);
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  });

  const [response, setResponse] = useState("");

  const { userID } = useParams();
  const nav = useNavigate();
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    async function getQuestions() {
      try {
        const { data } = await axios.get(`${API_URL}/diary-prompts`);
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
  function formateData(AIresponse) {
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
      AIparagraph: AIresponse,
    };
    return finalData;
  }

  // Function to submit

  async function submitData(AIresponse) {
    const dataToSubmit = formateData(AIresponse);
    try {
      const { data } = await axios.post(`${API_URL}/ days`, dataToSubmit);
    } catch (err) {
      console.log(err);
    }
  }

  //function show next question

  const handleNextQuestion = () => {
    setcurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlelastQuestion = async () => {
    alert("Well done for the day");
    console.log("All answers:", answers);

    await handleSubmit(); //AI
  };

  const handleSaveTheDay = async (AIresponse) => {
    await submitData(AIresponse); //save data to DB
    nav(`/profile/${userID}`);
  };

  function handleBacktoProfile() {
    nav(`/profile/${userID}`);
  }

  if (!question || question.length === 0) {
    return <p>loading ...</p>;
  }

  if (!question[currentQuestionIndex]) {
    return <p>current queestion loading</p>;
  }

  // ********************AI component here*****************************************************
  const SYSTEM_PROMPT = `You are a kind growth coach who helps people reflect and grow.
The user will give answers to these questions:
1. How am I feeling right now?
2. How does my body feel?
3. What might have shaped these feelings today?
4. What was the toughest part of my day?
5. What was the best moment of my day?
6. How did that moment make me feel?
7. What can I thank myself for today?
8. Any extra thoughts I want to note?   Respond kindly, validate feelings, offer short encouraging suggestions and one practical reflection prompt`;

  // Syntax for open ai
  // async function getGPTResponse(prompt) {
  //   // const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  //   const apiKey =
  //     "";

  //   try {
  //     const { data } = await axios.post(
  //       "https://api.openai.com/v1/chat/completions",
  //       {
  //         model: "gpt-3.5-turbo",
  //         messages: [
  //           { role: "system", content: SYSTEM_PROMPT },
  //           { role: "user", content: prompt },
  //         ],
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${apiKey}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     return data.choices[0].message.content;

  //     console.log("this is inside data", data.choices[0].message.content);
  //   } catch (err) {
  //     console.log("Error from openAI", err);
  //     return "Sorry I couldn't generate a responce right now";
  //   }
  // }

  async function getGPTResponse(prompt) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              { text: `${SYSTEM_PROMPT} User's diary entries: + ${prompt}` },
            ],
          },
        ],
      });

      const text = response.text;
      return text;
    } catch (err) {
      console.log("error from Gemini", err);
    }
  }

  async function handleSubmit() {
    const userPrompt = JSON.stringify(formateData());

    try {
      setSpinner(true);
      const reply = await getGPTResponse(userPrompt);
      setResponse(reply);
    } catch (err) {
      console.log(err);
    } finally {
      setSpinner(false);
    }
  }

  //*****************end of Ai+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  useEffect(() => {
    async function getVoice() {
      try {
        const data = {
          text: response,
          voiceId: "en-US-terrell",
        };
        axios
          .post("https://api.murf.ai/v1/speech/generate", data, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "api-key": import.meta.env.MURF_API_KEY,
            },
          })
          .then((response) => {
            console.log(response.data.audioFile);
          });
      } catch (err) {
        console.log;
      }
    }
  }, []);

  const data = {
    text: response,
    voiceId: "en-US-terrell",
  };
  axios
    .post("https://api.murf.ai/v1/speech/generate", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": import.meta.env.MURF_API_KEY,
      },
    })
    .then((response) => {
      console.log(response.data.audioFile);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  //*****************text to voice+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  return (
    <div className="question-page">
      <h2>Today is {currentDate}</h2>
      <div className="question-box">
        {!response && (
          <>
            <h2>Question {currentQuestionIndex + 1} </h2>
            <h4>{question[currentQuestionIndex].title} </h4>
            <textarea
              rows="4"
              cols="50"
              type="text"
              value={answers[currentQuestionIndex] || ""}
              onChange={handleStoreAnswer}
              placeholder="Type your answer"
            ></textarea>
            <br />
            {spinner && <div>this is spinner loading </div>}
          </>
        )}

        {response && (
          <div>
            <h3>Dear Diary's response:</h3>
            <p>{response}</p>
          </div>
        )}
        {currentQuestionIndex < question.length - 1 ? ( //not the last question
          <button className="prominent-btn" onClick={handleNextQuestion}>
            Next Question →
          </button>
        ) : !response ? ( //the last question
          <button className="prominent-btn" onClick={handlelastQuestion}>
            Get response from Dear Diary
          </button>
        ) : (
          //having Diary's response
          <button
            className="prominent-btn"
            onClick={() => {
              handleSaveTheDay(response);
            }}
          >
            Save the day!
          </button>
        )}
        <button className="not-so-prominent-btn" onClick={handleBacktoProfile}>
          Back to profile
        </button>
      </div>
    </div>
  );
};

export default Questionpage;
