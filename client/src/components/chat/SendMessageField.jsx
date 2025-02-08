import React, { useState } from "react";
import axios from "axios";
import { FiPaperclip, FiSend, FiSmile } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setuserMessages } from "../../redux/messageSlice";

const SendMessageField = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [message, setMessage] = useState("");
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const userMessages = useSelector((state) => state.message.userMessages);
  const dispatch = useDispatch();

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${apiUrl}/api/message/send-message/${selectedUser._id}`,
        {
          message: message,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setMessage("");
        dispatch(setuserMessages([...userMessages, res.data.newMessage]));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={sendMessage}
        className={`p-4 border-t border-gray-600
         w-full `}
      >
        <div className="flex items-center w-full space-x-2">
          <button
            type="button"
            className={`p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label="Attach file"
          >
            <FiPaperclip />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className={`flex-1 bg-gray-100 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button
            type="button"
            className={`p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label="Add emoji"
          >
            <FiSmile />
          </button>
          <button
            type="submit"
            className="p-2 bg-primary rounded-full text-white"
            aria-label="Send message"
          >
            <FiSend />
          </button>
        </div>
      </form>
    </>
  );
};

export default SendMessageField;
