import React, { useState } from "react";
import axios from "axios";
import { FiSend, FiSmile } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setUserMessages } from "../../redux/messageSlice";
import { io } from "socket.io-client";
import { LoaderIcon } from "react-hot-toast";

const SendMessageField = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [message, setMessage] = useState("");
  const [loading, setloading] = useState(false);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const userMessages = useSelector((state) => state.message.userMessages);
  const dispatch = useDispatch();

  // Get socket instance
  const socket = io(apiUrl, { withCredentials: true });

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!selectedUser || !message.trim()) return; // Prevent sending empty messages

    setloading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/api/message/send-message/${selectedUser._id}`,
        { message },
        { withCredentials: true }
      );

      if (res.data.success) {
        setMessage(""); // Clear input field

        // Update Redux state
        dispatch(setUserMessages([...userMessages, res.data.newMessage]));

        // Emit the message through Socket.io
        socket.emit("sendMessage", res.data.newMessage);
        setloading(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setloading(false);
    }
  };

  return (
    <form
      onSubmit={sendMessage}
      className="p-4 border-t border-gray-600 w-full"
    >
      <div className="flex items-center w-full space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 bg-gray-100 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          className="p-2 rounded-full hover:bg-gray-100 "
          aria-label="Add emoji"
        >
          <FiSmile />
        </button>
        <button
          type="submit"
          className="p-2 bg-primary rounded-full text-white"
          aria-label="Send message"
        >
          {loading ? <LoaderIcon color="#009c10" /> : <FiSend />}
        </button>
      </div>
    </form>
  );
};

export default SendMessageField;
