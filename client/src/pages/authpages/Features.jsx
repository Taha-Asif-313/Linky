import React from "react";

const Features = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-primary">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-4">Real-time Messaging</h3>
            <p className="text-gray-600">
              Stay connected with friends and family through real-time, one-on-one chat.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-4">Multidevice Sync</h3>
            <p className="text-gray-600">
              Access your messages on any device, whether you’re at home or on the go.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-4">Secure Conversations</h3>
            <p className="text-gray-600">
              All conversations are encrypted for maximum security and privacy.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-4">Customizable Interface</h3>
            <p className="text-gray-600">
              Personalize your chat interface to match your preferences.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-4">Instant Notifications</h3>
            <p className="text-gray-600">
              Receive real-time notifications so you never miss an important message.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-4">Easy Group Chats</h3>
            <p className="text-gray-600">
              Easily create and manage group chats with your contacts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
