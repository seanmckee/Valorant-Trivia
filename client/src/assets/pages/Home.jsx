import React, { useEffect, useState } from "react";
import TriviaCard from "../components/TriviaCard";
import axios from "axios";

const Home = () => {
  const [trivia, setTrivia] = useState([]);

  const getTrivia = async () => {
    try {
      const response = await axios.get("http://localhost:3001/questions");
      setTrivia(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTrivia();
  }, []);

  // console.log(trivia);

  return (
    <div className="lg:w-[50%] w-[80%] mx-auto">
      <h1 className="text-center text-red-400 text-3xl font-semibold mt-5 mb-1">
        Home
      </h1>
      <p className="text-center text-red-400 mb-4">
        Browse All Valorant Trivia Here
      </p>
      <div className="grid gap-5">
        {trivia.map((t) => (
          <div key={t._id}>
            <TriviaCard
              question={t.question}
              answers={t.answers}
              questionID={t._id}
              votedArr={t.voted}
              correctAnswerIndex={t.correctAnswerIndex}
            />{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
