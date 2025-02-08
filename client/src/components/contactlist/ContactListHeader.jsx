import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchFriend from "../dialogboxes/SearchFriend";

const ContactListHeader = () => {
  const [showAddFreind, setshowAddFreind] = useState(false);
  const authUser = useSelector((state) => state.user.authUser);
  return (
    <>
    <SearchFriend Show={showAddFreind} setShow={setshowAddFreind} />
      <div className="flex items-center justify-between py-4 px-4">
        <Link className={`flex items-center gap-1 font-bold`}>
          <img className="w-10" src="/logo.png" alt="Logo" />
          <h1 className="text-lg font-semibold">Linky</h1>
        </Link>
        <div className="text-xl max-lg:w-[50%] flex gap-4 items-center justify-end">
          {/* Only in mobiles to display user chat data */}
          <div className="flex md:hidden items-center">
            {authUser && (
              <Link to={"/profile"} className=" flex gap-2 items-center ml-1">
                <img className="w-8 h-8" src={authUser.profilePic} alt="" />
                <div className="flex flex-col">
                  <span className="text-[8px] leading-tight">
                    @{authUser.username}
                  </span>
                  <span className="lg:text-sm leading-tight text-[12px]">
                    {authUser.fullname}
                  </span>
                </div>
              </Link>
            )}
          </div>
          <button
            onClick={() => setshowAddFreind(true)}
            className="p-1 rounded-full bg-primary text-white focus:outline-none"
          >
            <FiPlus className="text-2xl rounded-full" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactListHeader;
