import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      if (response.data.userID === undefined) {
        alert("Wrong Username and/or Password");
        setUsername("");
        setPassword("");
      } else {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-auto">
      <h1 className="text-4xl text-center m-3 text-red-400">Login</h1>
      <form
        className="flex flex-col w-[40%] text-center m-auto my-5"
        onSubmit={onSubmit}
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
        <div>
          <button
            className="p-2 bg-red-400 text-slate-50 m-2 rounded-md w-[100px]"
            type="submit"
          >
            Login
          </button>
          <Link className="" to="/register">
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

export default Login;
