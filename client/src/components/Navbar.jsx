import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Popup from "reactjs-popup";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const [nav, setNav] = useState(false);

  const handleClick = () => setNav(!nav);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    setNav(!nav);
    navigate("/");
  };

  return (
    <div className=" bg-red-400 text-slate-50 p-8 pr-20">
      {/* nav */}
      <div className="hidden md:flex">
        <Link to="/" className="text-2xl mr-auto font-semibold">
          Valorant Trivia
        </Link>
        <Link to="/" className="mx-5">
          Home
        </Link>

        {!cookies.access_token ? (
          <Link to="login" className="mx-5">
            Login
          </Link>
        ) : (
          <div>
            <Link to="/create" className="mx-5">
              Create
            </Link>
            <Link to="/account" className="mx-5">
              Account
            </Link>
            <button onClick={logout} className="mx-5 mt-[-9px]">
              Logout
            </button>
          </div>
        )}
      </div>

      <div onClick={handleClick} className="md:hidden z-50 relative">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* mobile nav */}
      <ul
        className={
          !nav
            ? "hidden"
            : "text-center absolute top-0 left-0 w-full h-screen bg-red-400 flex flex-col justify-center items-center"
        }
      >
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="/" className="mx-5">
            Home
          </Link>
        </li>

        {!cookies.access_token ? (
          <li className="py-6 text-4xl">
            <Link onClick={handleClick} to="login" className="mx-5">
              Login
            </Link>
          </li>
        ) : (
          <div>
            <li className="py-6 text-4xl">
              <Link onClick={handleClick} to="/create" className="mx-5">
                Create
              </Link>
            </li>
            <li className="py-6 text-4xl">
              <Link onClick={handleClick} to="/account" className="mx-5">
                Account
              </Link>
            </li>
            <li className="py-6 text-4xl">
              <button onClick={logout} className="mx-5 mt-[-9px]">
                Logout
              </button>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
