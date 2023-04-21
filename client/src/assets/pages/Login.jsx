import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="m-auto">
      <form className="flex flex-col w-[40%] text-center m-auto my-5">
        <label className="text-red-500 mb-1" htmlFor="name">
          Username
        </label>
        <input
          className="rounded-full outline outline-red-400 outline-2 text-center py-1 mb-2"
          type="text"
          id="name"
          name="name"
        />

        <label className="text-red-500 mb-1" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-full outline outline-red-400 outline-2 text-center py-1 mb-2"
          type="text"
          id="password"
          name="password"
        />

        <button
          className="p-2 bg-red-400 text-slate-50 m-2 rounded-full"
          type="submit"
        >
          Login
        </button>
        <Link
          className="p-2 text-red-400 text-center m-2 rounded-full outline outline-red-400 outline-3 hover:bg-red-200"
          to="/Register"
        >
          Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
