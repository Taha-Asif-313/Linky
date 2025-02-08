import React from "react";
import { CiLogout } from "react-icons/ci";
import { GrLinkPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import { setselectedUser } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const ChatHeader = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const authUser = useSelector((state) => state.user.authUser);

  return (
    <header
      className={`flex flex-row-reverse items-center justify-end lg:justify-between py-3 px-4 bg-white border-b border-primary`}
    >
      <div className="text-xl flex items-center gap-4">
        <div className="flex max-lg:hidden items-center">
          <Link to={"/profile"} className=" flex gap-2 items-center">
            {authUser && (
              <>
                <img className="w-8 h-8" src={authUser.profilePic} alt="" />
                <div className="flex flex-col max-lg:hidden">
                  <span className="text-[8px] leading-tight">
                    @{authUser.username}
                  </span>
                  <span className="lg:text-sm text-[12px]">
                    {authUser.fullname}
                  </span>
                </div>
              </>
            )}
          </Link>
          <CiLogout className="text-2xl cursor-pointer ml-4 " />
        </div>
      </div>

      {selectedUser && (
        <div className="flex items-center">
          <GrLinkPrevious
            onClick={() => dispatch(setselectedUser(null))}
            className="mr-5 lg:hidden"
          />
          <img
            src={selectedUser.profilePic}
            alt={selectedUser.name}
            className="w-10 h-10 object-cover rounded-full mr-3"
          />
          <div>
            <h2 className="text-lg font-semibold">{selectedUser.fullname}</h2>
            <h2 className="text-[12px]">@{selectedUser.username}</h2>
          </div>
        </div>
      )}
    </header>
  );
};

export default ChatHeader;
