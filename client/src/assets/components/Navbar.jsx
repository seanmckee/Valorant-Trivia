import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Popup from "reactjs-popup";
import CreateTrivia from "./CreateTrivia";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/");
  };

  return (
    <div className="flex bg-red-400 text-slate-50 p-8 justify-end pr-20">
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
          <Popup
            trigger={<button className="mx-5 mt-[-9px]">Create</button>}
            modal
            nested
          >
            <CreateTrivia />
          </Popup>
          <Link to="/account" className="mx-5">
            Account
          </Link>
          <button onClick={logout} className="mx-5 mt-[-9px]">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
