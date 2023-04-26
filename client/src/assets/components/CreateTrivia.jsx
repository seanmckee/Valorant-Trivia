import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../hooks/useGetUserID";
import { Navigate, useNavigate } from "react-router-dom";

const CreateTrivia = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");

  // const [trivia, setTrivia] = useState({
  //   question: question,
  //   answers: answers,
  // });

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log({ question, answers, userOwner: userID });
      await axios.post(
        `http://localhost:3001/questions/${userID}`,
        { question, answers, userOwner: userID },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      alert("Trivia Created");
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

  // useEffect(() => {
  //   console.log(answers);
  // }, [answers]);

  return (
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
          onChange={(event) => setQuestion(event.target.value)}
        />

        <label className="text-red-500 mb-1 ml-2" htmlFor="question">
          Enter Answers
        </label>
        <div className="flex">
          <input
            className="m-2 mt-0 p-2 rounded-md border border-red-400 focus:border-3 focus:border-red-400"
            type="text"
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

        {answers.map((answer, index) => (
          <div className="mx-auto" key={index}>
            <ol className="flex justify-between w-[250px] ">
              <li className="mt-3 text-red-400">{answer.name}</li>
              <button
                className="p-2 bg-red-400 text-slate-50 m-2 rounded-md px-4"
                onClick={() => deleteAnswer(event, index)}
              >
                <FaTrash size={12} />
              </button>
            </ol>
          </div>
        ))}
        {/* <input
          className="m-2 mt-0 p-2 rounded-md border border-red-400 focus:border-3 focus:border-red-400"
          type="text"
        /> */}

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

// const deleteAnswer = () => {

//   return (
//     <div>

//     </div>
//   )
// }

export default CreateTrivia;
