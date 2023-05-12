import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useCookies } from "react-cookie";

const TriviaCard = ({ question, answers, questionID }) => {
  const [answerSelection, setAnswerSelection] = useState(0);
  const [voted, setVoted] = useState(false);

  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  const onSubmit = async (event) => {
    // event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/questions/${questionID}/${userID}/${answerSelection}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  // when trivia card is loaded
  // check if user voted
  // if voted show vote percentages and disable voting for user
  useEffect(() => {
    const checkIfVoted = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/${userID}`,
          {
            headers: { authorization: cookies.access_token },
          }
        );
        for (let i = 0; i < response.data.questionsVoted.length; i++) {
          if (response.data.questionsVoted[i].question === questionID) {
            setVoted(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (window.localStorage.getItem("userID")) {
      checkIfVoted();
    } else {
      setVoted(true);
    }
  }, [voted]);

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className=" text-red-400 bg-white rounded-2xl h-[200px] p-5 shadow-xl border border-red-400 border-1"
      >
        <h1 className="text-center">{question}</h1>

        {answers.map((answer, index) => (
          <div key={answer._id} className="">
            <input
              onChange={(event) => {
                setAnswerSelection(index);
              }}
              type="radio"
              id={answer._id}
              name="option"
              value={index}
              required
            />
            <label className="ml-1" htmlFor={answer._id}>
              {answer.name}
            </label>
          </div>
        ))}

        {!voted ? (
          <button className="p-1 bg-red-400 text-slate-50 m-2 rounded-md w-[75px] mx-auto">
            Submit
          </button>
        ) : (
          <p className="p-1 bg-red-400 text-slate-50 m-2 rounded-md w-[100px]  text-center">
            {window.localStorage.getItem("userID") ? "voted" : "login to vote"}
          </p>
        )}
      </form>
    </div>
  );
};

const VotingResults = () => {
  return (
    <div>
      <p></p>
    </div>
  );
};

export default TriviaCard;
