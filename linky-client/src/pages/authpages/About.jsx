import React from "react";

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Jane Smith",
    role: "Lead Developer",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Bob Brown",
    role: "Product Designer",
    image: "https://via.placeholder.com/150",
  },
];

const About = () => {
  return (
    <section className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">
          About Linky
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg mb-16">
          Linky is a real-time messaging platform crafted to connect people seamlessly and securely. Whether you're chatting with friends, family, or your team, Linky offers a smooth and modern experience across all your devices.
        </p>

        <div className="mb-10">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">Meet the Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition-transform hover:-translate-y-1"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-primary object-cover"
                />
                <h4 className="text-xl font-semibold text-gray-800">
                  {member.name}
                </h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
