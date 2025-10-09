import React from "react";
import Catpic from "../Cat.jpg";

const Notfoundpage = () => {
  return (
    <div className="not-found-page">
      <img src={Catpic} className="catpic" />
      <h2>Opps, this page is not found... meow...</h2>
    </div>
  );
};

export default Notfoundpage;
