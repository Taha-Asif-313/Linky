import React from "react";
import ChatHeader from "../../components/chat/ChatHeader";
import SendMessageField from "../../components/chat/SendMessageField";
import { useSelector } from "react-redux";
import ChatRoom from "../../components/chat/ChatRoom";
import Welcome from "../../components/chat/Welcome";

const ChatMessages = () => {
  const selectedUser = useSelector((state) => state.user.selectedUser);
  return (
    <main
      className={`w-full lg:flex flex-col ${selectedUser ? "flex" : "hidden"} `}
    >
      {/* Chatheader for profile data and chatuser data */}
      {selectedUser && <ChatHeader />}

      {/* Messages between users or chats */}
      {selectedUser ? <ChatRoom /> : <Welcome />}

      {/*Send message field */}
      {selectedUser && <SendMessageField />}
    </main>
  );
};

export default ChatMessages;
