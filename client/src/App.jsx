import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/authpages/Home";
import AuthLayout from "./pages/authpages/AuthLayout";
import SignUp from "./pages/authpages/SignUp";
import Login from "./pages/authpages/Login";
import ChatLayout from "./pages/chatpannelpages/ChatLayout";
import ChatMessages from "./pages/chatpannelpages/ChatMessages";
import UserProfile from "./pages/profile/UserProfile";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setonlineUsers } from "./redux/userSlice";
import { clearUserMessages, setUserMessages } from "./redux/messageSlice";
import Protected from "./components/Protected";
import Pricing from "./pages/authpages/Pricing";
import Features from "./pages/authpages/Features";
import About from "./pages/authpages/About";

const App = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const authUser = useSelector((state) => state.user.authUser);
  const userMessages = useSelector((state) => state.message.userMessages);

  useEffect(() => {
    if (isLogin && authUser) {
      const socket = io(import.meta.env.VITE_API_URL, {
        query: { userId: authUser._id },
      });

      socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      // Get online users when they join
      socket.on("getOnlineUser", (users) => {
        dispatch(setonlineUsers(users));
      });

      // Handle receiving new messages (user is online)
      socket.on("receiveMessage", (message) => {
        dispatch(setUserMessages([...userMessages, message]));
      });

      // Handle direct message sending event
      socket.on("sendMessage", (message) => {
        dispatch(setUserMessages([...userMessages, message]));
      });

      socket.on("deleteChat", ({ senderId, receiverId }) => {
        // Remove messages if the chat was deleted
        dispatch(clearUserMessages());
        console.log(`Chat deleted between ${senderId} and ${receiverId}`);
      });

      // Cleanup function to disconnect socket on unmount
      return () => {
        socket.disconnect();
        console.log("Socket disconnected");
      };
    }
  }, [isLogin, authUser, userMessages, dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="/chat" element={<Protected Component={ChatLayout} />}>
            <Route index element={<ChatMessages />} />
          </Route>
          <Route
            path="/profile"
            element={<Protected Component={UserProfile} />}
          />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
};

export default App;
