import React from "react";
import { Outlet } from "react-router-dom";
import ContactList from "./ContactList";

const ChatLayout = () => {
  return (
    <div className="flex w-full h-screen">
      <ContactList />
      <Outlet />
    </div>
  );
};

export default ChatLayout;
