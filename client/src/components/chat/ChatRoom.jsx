import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

const ChatRoom = () => {
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const userMessages = useSelector((state) => state.message.userMessages);
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-2">
      {Array.isArray(userMessages) &&
        userMessages.map((msg) => (
          <Message
            key={msg._id} // Add unique key prop
            msg={msg}
            selectedUser={selectedUser}
          />
        ))}
    </div>
  );
};

export default ChatRoom;
