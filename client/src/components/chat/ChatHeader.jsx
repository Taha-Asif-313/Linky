import React, { useState } from "react";
import { CiLogout, CiUser } from "react-icons/ci";
import { GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { setauthUser, setselectedUser } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { SlOptionsVertical } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";

const ChatHeader = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [options, setoptions] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const [cookies, removeCookie] = useCookies();

  const DeleteChat = async () => {
    try {
      const res = await axios.delete(
        `${apiUrl}/api/message/delete-chat/${selectedUser._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setloading(false);
        setoptions(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setloading(false);
    }
  };

  const Logout = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setauthUser({});
        localStorage.removeItem("authUser");
        removeCookie("authToken");
        window.location.reload();
        navigate("/");
        toast.success(res.data.message);
        setloading(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setloading(false);
    }
  };

  return (
    <header
      className={`flex flex-row-reverse items-center justify-end lg:justify-between py-3 px-4 bg-white border-b border-primary`}
    >
      {selectedUser && (
        <div className="w-full flex items-center justify-between">
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
          <div className="relative font-[sans-serif] w-max">
            <button
              type="button"
              id="dropdownToggle"
              onClick={() => setoptions(!options)}
              className="rounded text-2xl font-semibold text-primary"
            >
              {options ? <IoMdClose /> : <SlOptionsVertical />}
            </button>

            <ul
              id="dropdownMenu"
              className={`absolute left-[-150px] ${
                options ? "block" : "hidden"
              } shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded max-h-96 overflow-auto`}
            >
              <li
                onClick={DeleteChat}
                className="flex items-center py-3 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer"
              >
                <MdDelete className="mr-3 inline-block fill-current text-xl" />
                Delete Chat
              </li>
              <li
                onClick={() => navigate("/profile")}
                className="flex items-center py-3 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer"
              >
                <CiUser className="mr-3 inline-block fill-current text-xl" />
                Profile
              </li>
              <li
                onClick={Logout}
                className="flex items-center py-3 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer"
              >
                <CiLogout className="mr-3 inline-block fill-current text-xl" />
                Logout
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default ChatHeader;
