import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <div className="pt-8" >

      <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AuthLayout;
