import React from "react";

// Simple inline SVG icons
const icons = [
  (
    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
    </svg>
  ),
  (
    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 20h9M12 4h9M4 12h16" />
    </svg>
  ),
  (
    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 13l4 4L19 7" />
    </svg>
  ),
  (
    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 6h16M4 12h8m-8 6h16" />
    </svg>
  ),
  (
    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" />
    </svg>
  ),
  (
    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
    </svg>
  ),
];

const features = [
  {
    title: "Real-time Messaging",
    desc: "Chat instantly with anyone, anywhere — fast, reliable, and always online.",
  },
  {
    title: "Multidevice Sync",
    desc: "Switch devices seamlessly while keeping all your messages perfectly in sync.",
  },
  {
    title: "Secure Conversations",
    desc: "Enjoy end-to-end encrypted messaging for peace of mind and privacy.",
  },
  {
    title: "Customizable Interface",
    desc: "Personalize your experience with themes, layouts, and more.",
  },
  {
    title: "Instant Notifications",
    desc: "Stay informed in real-time with customizable, lightning-fast alerts.",
  },
  {
    title: "Easy Group Chats",
    desc: "Create and manage group chats effortlessly with intuitive controls.",
  },
];

const Features = () => {
  return (
    <section className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
          Our Key Features
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-16">
          Built to connect people in the most efficient, secure, and delightful way possible.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-transform hover:-translate-y-1 text-left"
            >
              <div className="mb-4">{icons[index]}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
