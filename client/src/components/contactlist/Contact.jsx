import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setselectedUser } from "../../redux/userSlice";
import { clearUserMessages, setuserMessages } from "../../redux/messageSlice";
import { IoIosAdd } from "react-icons/io";

const Contact = ({ user, activeChat }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const onlineUsers = useSelector((state) => state.user.onlineUsers);
  const isOnline =
    onlineUsers && onlineUsers.includes
      ? onlineUsers.includes(user._id)
      : false;

  const getUserMessages = async () => {
    if (!user) return; // Add null check for user
    try {
      const res = await axios.get(
        `${apiUrl}/api/message/get-conversation/${user._id}`,
        { withCredentials: true }
      );
      dispatch(setselectedUser(user));
      dispatch(setuserMessages(res.data.conversationMessages));
      console.log(res.data.conversationMessages);
    } catch (error) {}
  };

  return (
    <li onClick={getUserMessages} className="flex">
      <button
        className={`w-full flex items-center max-lg:bg-gray-200 justify-center p-2 max-lg:p-4 rounded-lg ${
          activeChat?.id === user.id
            ? "bg-gray-200 "
            : "hover:bg-primary hover:text-white"
        }`}
      >
        <div className="relative">
          <img
            src={user.profilePic}
            alt={user.fullname}
            className="w-10 h-10 object-cover rounded-full mr-3"
          />
          <div
            className={`absolute ${
              isOnline ? "" : "hidden"
            } bottom-0 right-0 w-3 h-3 mr-3 rounded-full bg-green-500 border-2 border-white`}
          ></div>
        </div>

        <div className="flex-1 text-left">
          <h3 className="font-semibold">{user.fullname}</h3>
          <h2 className="text-sm">@{user.username}</h2>
        </div>

        <div>
          <span className="bg-primary text-[12px] p-2 font-semibold w-6 h-6 flex items-center justify-center text-white rounded-full">
            10
          </span>
        </div>
      </button>
    </li>
  );
};

export default Contact;
