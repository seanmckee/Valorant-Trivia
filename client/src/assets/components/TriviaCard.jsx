import React from "react";

const TriviaCard = ({ question, answers }) => {
  return (
    <div>
      <form className=" bg-red-400 text-slate-50 p-5 rounded-md">
        <h1 className="text-center">{question}</h1>

        {/* <li key={answers._id} className="">
          <input type="radio" id="html" name="fav_language" value="HTML" />
          <label className="ml-1" htmlFor="html">
            {answers}
          </label>
        </li> */}

        {answers.map((answer) => (
          <div key={answer._id} className="">
            <input type="radio" id="html" name="fav_language" value="HTML" />
            <label className="ml-1" htmlFor="html">
              {answer.name}
            </label>
          </div>
        ))}

        <button className="bg-slate-50 text-red-400 p-1 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TriviaCard;
