import React from "react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-primary">Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <div className="pricing-card p-8 bg-gray-50 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Free</h3>
            <p className="text-lg mb-4">Perfect for casual users.</p>
            <ul className="text-left text-gray-600 mb-4">
              <li>Unlimited messages</li>
              <li>Basic features</li>
              <li>Limited support</li>
            </ul>
            <div className="price text-3xl font-bold text-primary">$0/month</div>
          </div>
          <div className="pricing-card p-8 bg-gray-50 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Pro</h3>
            <p className="text-lg mb-4">For users who want premium features.</p>
            <ul className="text-left text-gray-600 mb-4">
              <li>Real-time notifications</li>
              <li>Custom themes</li>
              <li>Priority support</li>
            </ul>
            <div className="price text-3xl font-bold text-primary">$9.99/month</div>
          </div>
          <div className="pricing-card p-8 bg-gray-50 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Enterprise</h3>
            <p className="text-lg mb-4">For businesses with advanced needs.</p>
            <ul className="text-left text-gray-600 mb-4">
              <li>All Pro features</li>
              <li>Advanced security</li>
              <li>Custom branding</li>
            </ul>
            <div className="price text-3xl font-bold text-primary">$29.99/month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
