import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FiSend,
  FiUserPlus,
  FiMessageCircle,
  FiSmartphone,
  FiShield,
  FiUser,
} from "react-icons/fi";
import Pricing from "./Pricing";

const Home = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  // Testimonial data array
  const testimonials = [
    {
      message:
        "Linky made team communication smoother than ever. It's fast, sleek, and reliable!",
      name: "Sarah Johnson",
      avatar: "/avatars/user1.png",
    },
    {
      message: "The UI is gorgeous, and it's so easy to navigate. Love it!",
      name: "Michael Lee",
      avatar: "/avatars/user2.png",
    },
    {
      message: "Our whole remote team uses Linky now. It’s a game changer.",
      name: "Amara Patel",
      avatar: "/avatars/user3.png",
    },
  ];

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 py-10">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl lg:text-6xl font-bold mb-4">
            Connect Instantly with <span className="text-primary">Linky</span>
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Real-time chatting made simple. Stay connected, share moments, and
            collaborate—wherever you are.
          </p>
          <Link
            to={isLogin ? "/chat" : "/signup"}
            className="inline-flex items-center justify-center gap-2 rounded px-6 py-1.5 text-sm font-semibold text-white bg-primary hover:bg-transparent hover:text-primary border border-primary transition-all"
          >
            {isLogin ? (
              <>
                <FiSend className="text-lg" />
                Go to Chat
              </>
            ) : (
              <>
                <FiUserPlus className="text-lg" />
                Get Started
              </>
            )}
          </Link>
        </div>
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <img
            src="/heropic.png"
            alt="Hero"
            className="w-full max-w-xl mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 lg:px-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Linky?</h2>
        <div className="grid md:grid-cols-3 gap-10 text-left mt-10 max-w-6xl mx-auto">
          {[
            {
              title: "Real-Time Messaging",
              desc: "Send and receive messages instantly with zero delay using Firebase.",
              icon: <FiMessageCircle className="text-4xl text-primary mb-3" />,
            },
            {
              title: "Cross-Device Support",
              desc: "Chat seamlessly across mobile, tablet, and desktop devices.",
              icon: <FiSmartphone className="text-4xl text-primary mb-3" />,
            },
            {
              title: "Secure and Private",
              desc: "All conversations are encrypted and protected with secure auth.",
              icon: <FiShield className="text-4xl text-primary mb-3" />,
            },
          ].map((f, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow border border-gray-200"
            >
              {f.icon}
              <h3 className="font-bold text-lg mb-2 text-primary">{f.title}</h3>
              <p className="text-gray-700 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing/>

      {/* Testimonials Section */}
      <section className="py-20 px-6 lg:px-20 bg-white text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">
          What Our Users Say
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
            >
              <p className="text-gray-700 text-base leading-relaxed italic">
                “{t.message}”
              </p>
              <div className="flex items-center gap-4 mt-6 justify-center">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full border border-primary object-cover"
                />
                <span className="text-sm font-semibold text-primary">
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 lg:px-20 bg-primary text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Start Chatting with Linky</h2>
        <p className="mb-6 text-lg">
          It’s free, fast, and fun to use. What are you waiting for?
        </p>
        <Link
          to={isLogin ? "/chat" : "/signup"}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded shadow hover:bg-gray-100 transition"
        >
          {isLogin ? <FiSend /> : <FiUserPlus />}
          {isLogin ? "Open Chat" : "Join Now"}
        </Link>
      </section>
    </div>
  );
};

export default Home;
