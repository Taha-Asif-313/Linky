import React from "react";
import Login from "../pages/authpages/Login";
import { useSelector } from "react-redux";

const Protected = (props) => {
    const isLogin = useSelector((state) => state.user.isLogin);
  const { Component } = props;
  return isLogin ? <Component /> : <Login />;
};

export default Protected;
