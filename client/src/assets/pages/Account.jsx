import React, { useEffect, useState } from "react";

import { useCookies } from "react-cookie";
import { useGetUserID } from "../../hooks/useGetUserID";
import axios from "axios";
import TriviaCard from "../components/TriviaCard";

const Account = () => {
  const [questions, setQuestions] = useState([]);

  const [cookies, _] = useCookies();
  const userID = useGetUserID();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/questions/${userID}`
        );
        // console.log(JSON.stringify(response.data));
        console.log(response.data);
        setQuestions(response.data);
      } catch {
        console.error(error);
      }
    };
    getQuestions();
  }, []);

  return (
    <div>
      {questions.map((question) => (
        <TriviaCard
          key={question._id}
          question={question.question}
          answers={question.answers}
        />
      ))}
    </div>
  );
};

export default Account;
