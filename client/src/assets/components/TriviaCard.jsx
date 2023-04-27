import React from "react";

const TriviaCard = ({ question, answers }) => {
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className=" text-red-400 bg-white rounded-2xl h-[200px] p-5 shadow-xl border border-red-400 border-1"
      >
        <h1 className="text-center">{question}</h1>

        {/* <li key={answers._id} className="">
          <input type="radio" id="html" name="fav_language" value="HTML" />
          <label className="ml-1" htmlFor="html">
            {answers}
          </label>
        </li> */}

        {answers.map((answer) => (
          <div key={answer._id} className="">
            <input type="radio" id="option" name="option" value="option" />
            <label className="ml-1" htmlFor="option">
              {answer.name}
            </label>
          </div>
        ))}

        <button className="p-1 bg-red-400 text-slate-50 m-2 rounded-md w-[75px] mx-auto">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TriviaCard;
