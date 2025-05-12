import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Welcome = () => {
  const authUser = useSelector((state) => state.user.authUser);
  return (
    <div className="flex items-center justify-center flex-col h-full rounded-md">
      <div className="absolute top-0 right-0 m-5 flex max-lg:hidden items-center">
        {authUser && (
          <Link to={"/profile"} className="flex gap-2 items-center">
            <img
              className="w-10 h-10 bg-black rounded-full"
              src={authUser.profilePic}
              alt="Profile pic"
            />
            <div className="flex flex-col max-lg:hidden">
              <span className="text-[8px] leading-tight">
                @{authUser.username}
              </span>
              <span className="lg:text-sm text-[12px]">
                {authUser.fullname}
              </span>
            </div>
          </Link>
        )}
      </div>
      <p className=" text-4xl">
        Welcome{" "}
        <span className="font-bold text-primary">{authUser.fullname}! 👋</span>
      </p>
    </div>
  );
};

export default Welcome;
