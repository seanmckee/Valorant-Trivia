import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Popup from "reactjs-popup";
import { useGetUserID } from "../hooks/useGetUserID";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

const Create = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();

    // closeCreate();

    if (answers.length < 2) {
      alert("Enter 2 or more answers");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3001/questions/${userID}`,
        {
          question,
          answers,
          userOwner: userID,
          correctAnswerIndex: correctAnswer,
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      // alert("Trivia Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAnswer = (event, index) => {
    let answersCopy = [...answers];

    answersCopy.splice(index, 1);
    setAnswers(answersCopy);
  };

  const newAnswer = (event) => {
    event.preventDefault();
    if (currentAnswer.length === 0) {
      alert("Enter a valid answer");
      return;
    }
    setAnswers([...answers, { name: currentAnswer, votes: 0 }]);
    setCurrentAnswer("");
  };

  return (
    <div className="w-[50%] mx-auto mt-10">
      <h1 className="text-center text-red-400 text-xl mb-5 font-semibold">
        Create New Trivia
      </h1>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <label
          className="text-red-500 mb-1 ml-2 text-center"
          htmlFor="question"
        >
          Enter Question
        </label>
        <input
          className="m-2 mt-0 p-2 rounded-md border border-red-400 focus:border-3 focus:border-red-400"
          type="text"
          name="question"
          value={question}
          id="question"
          onChange={(event) => setQuestion(event.target.value)}
          required
        />

        <label className="text-red-500 mb-1 ml-2 text-center" htmlFor="answer">
          Enter Answers
        </label>
        <div className="flex">
          <input
            className="ml-2 mt-0 p-2 rounded-md border border-red-400 focus:border-3 focus:border-red-400 w-full m-auto"
            type="text"
            id="answer"
            value={currentAnswer}
            onChange={(event) => setCurrentAnswer(event.target.value)}
          />
          <button
            className="p-2 bg-red-400 text-slate-50 ml-1 rounded-md px-4 w-[48px] h-[42px]"
            onClick={newAnswer}
          >
            <AiFillPlusCircle />
          </button>
        </div>
        <p className="text-center text-red-400 mb-1">Select Correct Answer</p>

        {answers.map((answer, index) => (
          <div className="ml-5" key={index}>
            <div className="flex justify-between mx-auto w-[250px] ">
              <input
                className="mr-2"
                onChange={(event) => {
                  setCorrectAnswer(index);
                }}
                type="radio"
                name="option"
                id={"option" + index}
              />
              <label className="mt-2" htmlFor={"option" + index}>
                {answer.name}
              </label>
              <button
                className="p-2 bg-red-400 text-slate-50 m-2 rounded-md px-4"
                onClick={() => deleteAnswer(event, index)}
              >
                <FaTrash size={12} />
              </button>
            </div>
          </div>
        ))}

        <button
          className="p-2 bg-red-400 text-slate-50 m-2 rounded-md w-[100px] mx-auto"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
