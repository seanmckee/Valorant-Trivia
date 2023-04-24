import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <h1 className="text-4xl text-center m-3 text-red-400">Register</h1>
      <form className="flex flex-col w-[40%] text-center m-auto my-5">
        <label className="text-red-500 mb-1" htmlFor="name">
          Username
        </label>
        <input
          className="rounded-md outline outline-red-400 outline-2 text-center py-1 mb-2"
          type="text"
          id="name"
          name="name"
        />

        <label className="text-red-500 mb-1" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md outline outline-red-400 outline-2 text-center py-1 mb-2"
          type="text"
          id="password"
          name="password"
        />

        <label className="text-red-500 mb-1" htmlFor="password2">
          Confirm Password
        </label>
        <input
          className="rounded-md outline outline-red-400 outline-2 text-center py-1 mb-2"
          type="text"
          id="password2"
          name="password2"
        />
        <div>
          <Link className="" to="/login">
            <button
              className="p-2 bg-red-400 text-slate-50 m-2 rounded-md w-[100px]"
              type="submit"
            >
              Register
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
