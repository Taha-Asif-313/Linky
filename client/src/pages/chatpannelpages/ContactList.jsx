import React, { useEffect, useState } from "react";
import ContactListHeader from "../../components/contactlist/ContactListHeader";
import Contact from "../../components/contactlist/Contact";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setConversations } from "../../redux/messageSlice";

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
        dispatch(setConversations(res.data.receiverIds));
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
          {Array.isArray(conversations) &&
            conversations.map((conversation) => (
              <>
                <Contact
                  key={conversation._id}
                  user={conversation}
                  activeChat={activeChat}
                  setActiveChat={setActiveChat}
                />
              </>
            ))}
        </ul>
      </div>
    </>
  );
};

export default ContactList;
