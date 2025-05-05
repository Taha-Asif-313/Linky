import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-primary">About Us</h2>
        <p className="text-lg text-gray-700 mb-8">
          Linky is a powerful, real-time chat application designed to help people connect with each other seamlessly. Whether you're chatting with friends, family, or coworkers, Linky provides a simple and effective platform for communication.
        </p>
        <div className="team-section">
          <h3 className="text-2xl font-semibold mb-4">Meet the Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div className="team-member">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h4 className="font-semibold">John Doe</h4>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="team-member">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h4 className="font-semibold">Jane Smith</h4>
              <p className="text-gray-600">Lead Developer</p>
            </div>
            <div className="team-member">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h4 className="font-semibold">Bob Brown</h4>
              <p className="text-gray-600">Product Designer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
