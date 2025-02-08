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
import { setuserMessages } from "./redux/messageSlice";
import Protected from "./components/Protected";

const App = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const authUser = useSelector((state) => state.user.authUser);
  const userMessages = useSelector((state) => state.message.userMessages);
  useEffect(() => {
    if (isLogin && authUser) {
      const newSocket = io(`${import.meta.env.VITE_API_URL}`, {
        query: { userId: authUser._id },
      });

      newSocket.on("connect", () => {
        console.log("Connected to socket server");
      });

      newSocket.on("getOnlineUser", (users) => {
        dispatch(setonlineUsers(users));
        console.log(users);
      });

      newSocket.on("userMessages", (messages) => {
        dispatch(setuserMessages(messages));
        console.log(messages);
      });

      newSocket.on("sendMessage", (message) => {
        dispatch(setuserMessages(message));
        console.log(message);
        console.log(userMessages);
      });

      // Cleanup function to disconnect the socket when the component unmounts
      return () => {
        newSocket.disconnect();
      };
    }
  }, [isLogin, authUser]); // Dependencies for useEffect

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
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
