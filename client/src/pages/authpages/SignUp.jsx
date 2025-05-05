import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { loading, ValidateUser } = useAuth();
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-white">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white">
      {/* Left Column - Graphic/Intro */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gray-100 px-10">
        <div className="text-center">
          <Link to={"/"} className="flex justify-center items-center gap-2">
            <img className="w-40" src="/logo.png" alt="logo" />
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-primary mb-2">
          Welcome to Linky!
        </h2>
        <p className="text-center text-gray-600 max-w-sm">
          Create an account to explore and connect through the most intelligent
          chatting platform.
        </p>
      </div>

      {/* Right Column - Signup Form */}
      <div className="flex h-screen items-center justify-center w-full md:w-1/2 px-4">
        <form className="w-full max-w-md p-6 border border-gray-200 rounded-2xl shadow-xl bg-white">
          <div className="mb-6 text-center">
            <Link to={"/"} className="flex justify-center items-center gap-2">
              <img className="w-10" src="/logo.png" alt="logo" />
              <span className="text-2xl font-extrabold text-primary">
                Linky
              </span>
            </Link>
          </div>

          {/* Full Name */}
          <div className="mb-2 relative">
            <input
              name="fullname"
              onChange={onChangeHandler}
              value={inputs.fullname}
              type="text"
              required
              placeholder="Enter Full Name"
              className="w-full text-sm border border-gray-300 px-4 py-2 rounded placeholder:text-zinc-600"
            />
            <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Username */}
          <div className="mb-2 relative">
            <input
              name="username"
              onChange={onChangeHandler}
              value={inputs.username}
              type="text"
              required
              placeholder="Enter Username"
              className="w-full text-sm border border-gray-300 px-4 py-2 rounded placeholder:text-zinc-600"
            />
            <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Email */}
          <div className="mb-2 relative">
            <input
              name="email"
              onChange={onChangeHandler}
              value={inputs.email}
              type="email"
              required
              placeholder="Enter Email"
              className="w-full text-sm border border-gray-300 px-4 py-2 rounded placeholder:text-zinc-600"
            />
            <IoMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Password */}
          <div className="mb-2 relative">
            <input
              name="password"
              onChange={onChangeHandler}
              value={inputs.password}
              type="password"
              required
              placeholder="Enter Password"
              className="w-full text-sm border border-gray-300 px-4 py-2 rounded placeholder:text-zinc-600"
            />
            <FaLock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Confirm Password */}
          <div className="mb-4 relative">
            <input
              name="confirmPassword"
              onChange={onChangeHandler}
              value={inputs.confirmPassword}
              type="password"
              required
              placeholder="Confirm Password"
              className="w-full text-sm border border-gray-300 px-4 py-2 rounded placeholder:text-zinc-600"
            />
            <FaLock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Submit */}
          <button
            onClick={() => {
              ValidateUser(`${apiUrl}/api/auth/signup`, inputs);
            }}
            type="button"
            className="w-full py-2 text-sm font-semibold rounded bg-primary text-white hover:bg-transparent hover:text-primary border-2 border-primary transition-all"
          >
            Sign Up
          </button>

          {/* Link to Login */}
          <p className="text-sm text-center mt-6 text-gray-600">
            Already have an account?
            <Link
              to={"/login"}
              className="text-primary hover:underline font-medium ml-1"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
