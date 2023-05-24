import axios from "axios";
import React, { useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== password2) {
      setPassword("");
      setPassword2("");
      alert("Passwords do not match");
    } else {
      try {
        await axios.post("https://valorant-trivia.onrender.com/auth/register", {
          username,
          password,
        });

        navigate("/login");
        alert("Registration Completed! Now Login");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center m-3 text-red-400">Register</h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-[40%] text-center m-auto my-5"
      >
        <label className="text-red-500 mb-1" htmlFor="name">
          Username
        </label>
        <input
          className="rounded-md outline outline-red-400 outline-2 text-center py-1 mb-2"
          type="text"
          id="name"
          name="name"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label className="text-red-500 mb-1" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md outline outline-red-400 outline-2 text-center py-1 mb-2"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <label className="text-red-500 mb-1" htmlFor="password2">
          Confirm Password
        </label>
        <input
          className="rounded-md outline outline-red-400 outline-2 text-center py-1 mb-2"
          type="password"
          id="password2"
          name="password2"
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
        />
        <div>
          <button
            className="p-2 bg-red-400 text-slate-50 m-2 rounded-md w-[100px]"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
