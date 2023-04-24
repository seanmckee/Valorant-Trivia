import React from "react";

const CreateTrivia = () => {
  return (
    <div className="bg-red-400 p-20 rounded-md">
      <h1 className="text-center text-slate-50 text-xl">Create New Trivia</h1>
      <form className="flex flex-col">
        <input className="m-2 p-2 rounded-md" type="text" />
        <input className="m-2 p-2 rounded-md" type="text" />
      </form>
    </div>
  );
};

export default CreateTrivia;
