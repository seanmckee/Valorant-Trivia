import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../hooks/useGetUserID";
import { Navigate, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

const CreateTrivia = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState();
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  // const onChange = (event) => {
  //   setCorrectAnswer(event.target.value);
  //   console.log(correctAnswer);
  // };

  const onSubmit = async (event) => {
    event.preventDefault();
    closeTooltip();
    // closeCreate();

    if (answers.length < 2) {
      alert("Enter 2 or more answers");
      return;
    }

    try {
      console.log({ question, answers, userOwner: userID });
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
    event.preventDefault();
    let answersCopy = [...answers];

    answersCopy.splice(index, 1);
    setAnswers(answersCopy);

    console.log(answersCopy);
  };

  const newAnswer = (event) => {
    event.preventDefault();
    setAnswers([...answers, { name: currentAnswer, votes: 0 }]);
    setCurrentAnswer("");
  };

  // const togglePopUp = () => {
  //   setOpen((open) => !open);
  //   console.log(open);
  // };

  const clicked = () => {
    // setOpen((o) => !o);
    console.log("open: " + open);
  };

  return (
    <Popup
      trigger={
        <button className="mx-5 mt-[-9px]" onClick={clicked}>
          Create
        </button>
      }
      modal
      nested
      closeOnDocumentClick
      opened={open}
      onClose={closeModal}
    >
      <div className="bg-slate-100 border border-red-400 p-20 rounded-md shadow-xl">
        <h1 className="text-center text-red-400 text-xl mb-5 font-semibold">
          Create New Trivia
        </h1>
        <form className="flex flex-col" onSubmit={onSubmit}>
          <label className="text-red-500 mb-1 ml-2" htmlFor="question">
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

          <label className="text-red-500 mb-1 ml-2" htmlFor="answer">
            Enter Answers
          </label>
          <div className="flex">
            <input
              className="m-2 mt-0 p-2 rounded-md border border-red-400 focus:border-3 focus:border-red-400"
              type="text"
              id="answer"
              value={currentAnswer}
              onChange={(event) => setCurrentAnswer(event.target.value)}
            />
            <button
              className="p-2 bg-red-400 text-slate-50 m-2 rounded-md px-4 mx-auto"
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
    </Popup>
  );
};

export default CreateTrivia;
