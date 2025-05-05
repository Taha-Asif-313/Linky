import React, { useEffect, useState } from "react";
import ContactListHeader from "../../components/contactlist/ContactListHeader";
import Contact from "../../components/contactlist/Contact";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setConversations } from "../../redux/messageSlice";
import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";

const ContactList = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const conversations = useSelector((state) => state.message.conversations);
  const [activeChat, setActiveChat] = useState(null);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/api/message/user-conversations`,
          {
            withCredentials: true,
            headers: {
              Authorization: token ? `Bearer ${token}` : "", // Include token if available
            },
          }
        );
        dispatch(setConversations(res.data.conversations));
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchConversations();
  }, []);

  return (
    <>
      <div
        className={`w-full lg:w-[400px] lg:block ${
          selectedUser ? "hidden" : "block"
        } text-black border-r border-gray-200`}
      >
        <ContactListHeader />
        <ul className="space-y-2 p-4">
          {Array.isArray(conversations) && conversations.length > 0 ? (
            conversations.map((conversation) => (
              <li key={conversation.user._id}>
                <Contact
                  user={conversation.user}
                  activeChat={activeChat}
                  setActiveChat={setActiveChat}
                  UnReadM={conversation.unreadCount}
                />
              </li>
            ))
          ) : (
            <div className="h-screen flex flex-col gap-2 items-center justify-center">
              <p className="text-primary">Not chat found</p>
              <Link
                
                className="inline-flex items-center justify-center gap-2 rounded px-6 py-1.5 text-sm font-semibold text-white bg-primary hover:bg-transparent hover:text-primary border border-primary transition-all"
              >
                <>
                  <FiUserPlus className="text-lg" />
                  Get Started
                </>
              </Link>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default ContactList;
