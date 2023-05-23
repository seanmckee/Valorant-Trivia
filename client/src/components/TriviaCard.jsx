import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

const TriviaCard = ({
  question,
  answers,
  questionID,
  votedArr,
  correctAnswerIndex,
}) => {
  const [answerSelection, setAnswerSelection] = useState(0);
  const [voted, setVoted] = useState(false);
  const [voterCount, setVoterCount] = useState(votedArr.length);

  // state in order to update answer labels on vote submit
  const [theAnswers, setTheAnswers] = useState(answers);

  {
    /* 
    State for:
      - total votes / voter count
      - votes for each answer (do objects in state array update in .map?)
  */
  }

  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  const onSubmit = async (event) => {
    event.preventDefault();

    // creates new theAnswers array and puts it into theAnwers state
    let ans = [...theAnswers];
    let an = { ...ans[answerSelection] };
    an.votes = an.votes + 1;
    ans[answerSelection] = an;
    setTheAnswers(ans);

    setVoterCount((c) => c + 1);

    setVoted((v) => !v);
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
            setAnswerSelection(response.data.questionsVoted[i].votedIndex);
            // console.log("votedindex: " + answerSelection);
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
    <div className="m-auto text-center">
      <form
        onSubmit={onSubmit}
        className=" text-red-400 bg-white rounded-2xl p-5 shadow-xl border border-red-400 border-1 h-[300px]"
      >
        <div className="text-center border-b-2 mb-2 border-red-300 pb-4 max-h-[70px] overflow-y-auto">
          {question}
        </div>

        {/* {console.log(cardAnswers)} */}

        <div className="text-center m-auto max-h-[150px] overflow-y-auto">
          {answers &&
            theAnswers.map((answer, index) => (
              <div key={answer._id} className="m-1">
                <input
                  className=""
                  onChange={(event) => {
                    setAnswerSelection(index);
                  }}
                  type="radio"
                  id={answer._id}
                  name="option"
                  value={index}
                  required
                />
                <label
                  className={
                    index === correctAnswerIndex &&
                    voted &&
                    window.localStorage.getItem("userID")
                      ? "ml-1 bg-green-200 p-[2px] rounded-lg text-green-700"
                      : index === answerSelection &&
                        voted &&
                        window.localStorage.getItem("userID") &&
                        answerSelection !== correctAnswerIndex
                      ? "ml-1 bg-red-200 p-[2px] rounded-lg text-red-700"
                      : "ml-1"
                  }
                  htmlFor={answer._id}
                >
                  {!voted || !window.localStorage.getItem("userID")
                    ? answer.name
                    : answer.name +
                      ", " +
                      Math.floor((answer.votes / voterCount) * 100) +
                      "%, (" +
                      answer.votes +
                      ")"}
                </label>
              </div>
            ))}
        </div>

        {!voted ? (
          <button className="p-1 bg-red-400 text-slate-50 m-2 rounded-md w-[75px] mx-auto">
            Submit
          </button>
        ) : (
          <p className="p-1 bg-red-400 text-slate-50 m-2 rounded-md w-[100px] mx-auto text-center">
            {window.localStorage.getItem("userID") ? "voted" : "login to vote"}
          </p>
        )}
      </form>
    </div>
  );
};

export default TriviaCard;
