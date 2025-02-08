import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UpdatedProfile from "../../components/dialogboxes/UpdatedProfile";

const UserProfile = () => {
  const authUser = useSelector((state) => state.user.authUser);
  const [dialogOpen, setdialogOpen] = useState(false);

  return (
    <>
      <UpdatedProfile
        show={dialogOpen}
        setshow={setdialogOpen}
        fullname={authUser.fullname}
        email={authUser.email}
      />
      <div className="h-screen w-full flex justify-center items-center">
        <Link to={"/chat"} className="absolute m-4 top-0 right-0 text-4xl">
          <IoIosArrowForward />
        </Link>
        <div className="flex items-center flex-col w-full">
          <div className="md:w-1/3 text-center mb-8 md:mb-0">
            <img
              src={"https://avatar.iran.liara.run/public"}
              alt="Profile Picture"
              className="rounded-full w-32 h-32 md:w-32 md:h-32 mx-auto border-4 border-primary transition-transform duration-300 hover:scale-105"
            />
            <h1 className="text-2xl font-bold">{authUser.fullname}</h1>
            <p className="">@{authUser.username}</p>
            <div className="flex gap-2 items-center justify-center">
              <button
                onClick={() => {
                  setdialogOpen(true);
                }}
                className="mt-4 bg-primary text-white px-4 py-2 rounded text-sm"
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div className="md:w-2/3 md:pl-8 max-lg:px-5">
            <h2 className="text-xl font-semibold mb-4">About Me</h2>
            <p className="mb-6">
              Passionate software developer with 5 years of experience in web
              technologies. I love creating user-friendly applications and
              solving complex problems.
            </p>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {authUser.email}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
