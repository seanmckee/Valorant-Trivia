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
    <div className="w-[60%] mx-auto">
      <h1 className="text-center text-red-400 text-3xl font-semibold mt-5 mb-1">
        Home
      </h1>
      <p className="text-center text-red-400 mb-4">
        Browse All Valorant Trivia Here
      </p>
      <div className="grid grid-cols-3 gap-5">
        {trivia.map((t) => (
          <TriviaCard key={t._id} question={t.question} answers={t.answers} />
        ))}
      </div>
    </div>
  );
};

export default Home;
