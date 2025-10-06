import axios from "axios";
import React, { useEffect } from "react";

const Questionpage = () => {
  useEffect(() => {
    async function getQuestions() {
      try {
        const { data } = await axios.get("http://localhost:5005/diary-prompts");
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    getQuestions();
  }, []);

  return <div></div>;
};

export default Questionpage;
