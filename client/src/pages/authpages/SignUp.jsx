import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { loading, ValidateUser } = useAuth();
  const [inputs, setinputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className=" md:flex-row-reverse flex justify-center items-center h-screen gap-8">
      <form className="w-full lg:max-w-[380px] lg:border border-gray-900 p-6 rounded mx-auto">
        <div className="mb-4 ">
          <Link to={"/"} className={`flex justify-center items-center gap-1`}>
            <img className="w-10" src="/logo.png" alt="logo" />
            <span className="text-xl font-extrabold">Linky</span>
          </Link>
        </div>
        <div className="mb-3">
          <div className="relative flex items-center">
            <input
              name="fullname"
              onChange={onChangeHandler}
              value={inputs.fullname}
              type="text"
              required
              className="w-full text-sm border border-gray-300 px-4 py-2 rounded placeholder:text-zinc-600"
              placeholder="Enter Name"
            />
            <FaUser className="text-sm absolute right-4" />
          </div>
        </div>
        <div className="mb-3">
          <div className="relative flex items-center">
            <input
              name="username"
              onChange={onChangeHandler}
              value={inputs.username}
              type="text"
              required
              className="w-full text-sm border border-gray-300 px-4 py-2 rounded placeholder:text-zinc-600"
              placeholder="Enter Username"
            />
            <FaUser className="text-sm absolute right-4" />
          </div>
        </div>
        <div className="mb-3">
          <div className="relative flex items-center">
            <input
              name="email"
              onChange={onChangeHandler}
              value={inputs.email}
              type="text"
              required
              className="w-full text-sm border border-gray-300 px-4 py-2 rounded placeholder:text-zinc-600"
              placeholder="Enter Email"
            />
            <IoMail className="text-sm absolute right-4" />
          </div>
        </div>
        <div className="mb-3">
          <div className="relative flex items-center">
            <input
              name="password"
              onChange={onChangeHandler}
              value={inputs.password}
              type="text"
              required
              className="w-full text-sm border border-gray-300 px-4 py-2 rounded placeholder:text-zinc-600"
              placeholder="Enter Password"
            />
            <FaLock className="text-sm absolute right-4" />
          </div>
        </div>
        <div className="mb-3">
          <div className="relative flex items-center">
            <input
              name="confirmPassword"
              onChange={onChangeHandler}
              value={inputs.confirmPassword}
              type="text"
              required
              className="w-full text-sm border border-gray-300 px-4 py-2 rounded placeholder:text-zinc-600"
              placeholder="Confirm Password"
            />
            <FaLock className="text-sm absolute right-4" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mt-1">
            <div>
              <a className="text-primary text-[12px] hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <button
            onClick={() => {
              ValidateUser(`${apiUrl}/api/auth/signup`, inputs);
            }}
            type="button"
            className="w-full shadow-xl py-1.5 px-5 text-sm font-semibold rounded text-white bg-primary hover:bg-transparent border-2 hover:text-primary border-primary transition-all"
          >
            SignUp
          </button>
          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-primary hover:underline ml-1 whitespace-nowrap"
            >
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
