import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex bg-red-400 text-slate-50 p-8 justify-end pr-20">
      <h2 className="text-2xl mr-auto font-semibold">Valorant Trivia</h2>
      <Link to="/" className="mx-5">
        Home
      </Link>
      <Link to="/" className="mx-5">
        Account
      </Link>
      <Link to="login" className="mx-5">
        Login
      </Link>
    </div>
  );
};

export default Navbar;
