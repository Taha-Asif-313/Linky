import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav
      className={`flex rounded-b-md w-full absolute z-20 justify-between items-center py-1.5 px-6 lg:px-10 bg-zinc-950 text-white`}
    >
      <div className="nav-start-section lg:w-[30%] w-[45%]">
        <div className="logo cursor-pointer">
          <Link to={"/"} className={`flex items-center gap-1 font-bold`}>
            <img className="w-10" src="/logo.png" alt="Logo" />
            <h1 className="text-lg font-semibold max-lg:hidden">Linky</h1>
          </Link>
        </div>
      </div>

      <div className="nav-end-section items-end justify-end lg:w-[30%] w-[45%] md:flex space-x-4">
        <div className="buttons flex items-center justify-end gap-2">
          <Link
            to={"/signup"}
            className="singup-btn text-sm rounded py-1 px-5 font-medium transition-all duration-300 cursor-pointer border border-primary bg-primary hover:bg-transparent"
          >
            Let's Chat
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
