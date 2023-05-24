import React, { useEffect, useState } from "react";

import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import TriviaCard from "../components/TriviaCard";

const Account = () => {
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState();

  const [cookies, _] = useCookies();
  const userID = useGetUserID();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get(
          `https://valorant-trivia.onrender.com/questions/${userID}`
        );
        // console.log(JSON.stringify(response.data));
        // console.log(response.data);
        setQuestions(response.data);
      } catch {
        console.error(error);
      }
    };

    const getUser = async () => {
      try {
        const response = await axios.get(
          `https://valorant-trivia.onrender.com/user/${userID}`,
          {
            headers: { authorization: cookies.access_token },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getQuestions();
    getUser();
  }, []);

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-center text-red-400 text-3xl font-semibold mt-5 mb-1">
        Account
      </h1>
      {/* <p className="text-center text-red-400 mb-3">
        View your created trivia here
      </p>
      <hr className="w-[100px] mx-auto border-red-300 my-3" /> */}
      <div className="flex justify-center">
        <p className="m-2 text-red-400">
          Correct:{" "}
          {user && user.correctlyAnswered
            ? Math.round(
                (user.correctlyAnswered /
                  ((user.correctlyAnswered ? user.correctlyAnswered : 0) +
                    (user.incorrectlyAnswered
                      ? user.incorrectlyAnswered
                      : 0))) *
                  100
              )
            : 0}
          % ({user && user.correctlyAnswered ? user.correctlyAnswered : 0})
        </p>
        <p className="m-2 text-red-400">
          Incorrect:{" "}
          {user && user.incorrectlyAnswered
            ? Math.round(
                (user.incorrectlyAnswered /
                  ((user.correctlyAnswered ? user.correctlyAnswered : 0) +
                    (user.incorrectlyAnswered
                      ? user.incorrectlyAnswered
                      : 0))) *
                  100
              )
            : 0}
          % ({user && user.incorrectlyAnswered ? user.incorrectlyAnswered : 0})
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {questions.map((question) => (
          <div key={question._id}>
            <TriviaCard
              question={question.question}
              answers={question.answers}
              questionID={question._id}
              votedArr={question.voted}
              correctAnswerIndex={question.correctAnswerIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Account;
