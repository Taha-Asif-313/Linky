import React from "react";

const Home = () => {
  return (
    <div className="h-[600px] flex lg:justify-between justify-center items-center md:h-screen max-lg:h-screen max-lg:py-20 px-8 md:flex-row flex-col-reverse ">
      <div className=" mx-auto max-md:text-center lg:pl-10 md:w-[50%]">
        <h2 className=" md:text-5xl lg:text-7xl text-5xl font-bold">
          Welcome to <span className="text-primary">Linky</span>!
        </h2>
        <p className="text-base mt-4 lg:pr-20">
        A real-time chat app built with Firebase and React, enabling seamless one-on-one messaging. It features authentication, real-time updates, and a user-friendly interface for instant communication across devices.
        </p>
        <div className="flex max-sm:flex-col justify-start gap-6 mt-4">
          <a
            href="/signup"
            type="button"
            className="min-w-[140px] text-center rounded px-4 py-2.5 text-sm tracking-wider font-semibold outline-none border text-white border-primary bg-primary hover:bg-transparent hover:text-primary transition-all duration-300"
          >
            Let's discover
          </a>
        </div>
      </div>
      <div className="lg:w-[50%] flex items-center justify-center">
        <img src="heropic.png" alt="" />
      </div>
    </div>
  );
};

export default Home;
