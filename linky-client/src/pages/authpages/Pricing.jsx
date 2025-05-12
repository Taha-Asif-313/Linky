import React from "react";

const plans = [
  {
    name: "Free",
    desc: "Perfect for casual users.",
    price: "$0/month",
    features: ["Unlimited messages", "Basic features", "Limited support"],
    highlight: false,
  },
  {
    name: "Pro",
    desc: "For users who want premium features.",
    price: "$9.99/month",
    features: ["Real-time notifications", "Custom themes", "Priority support"],
    highlight: true,
  },
  {
    name: "Enterprise",
    desc: "For businesses with advanced needs.",
    price: "$29.99/month",
    features: ["All Pro features", "Advanced security", "Custom branding"],
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-16">
          Find the plan that fits your needs and get started right away.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-white p-8 rounded-3xl shadow-md border transition hover:shadow-xl hover:-translate-y-1 ${
                plan.highlight
                  ? "border-primary ring-2 ring-primary scale-105"
                  : "border-gray-200"
              }`}
            >
              {plan.highlight && (
                <span className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-500 mb-6">{plan.desc}</p>

              <div className="text-4xl font-extrabold text-primary mb-6">
                {plan.price}
              </div>

              <ul className="text-left space-y-3 text-gray-600 mb-8">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {f}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
