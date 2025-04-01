import React from "react";
import bgImage from "../Utilites/images/bg.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Arka Plan Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm" />
      </div>

      {/* İçerik Container */}
      <div className="relative z-10 max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Financial Mastery
          </h1>
          <p className="text-lg text-gray-200 mt-2 leading-relaxed">
            Easily track and manage your expenses. Gain insights and take
            control of your finances.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: "📊",
              title: "Analytics",
              text: "Visualize your spending with easy-to-read charts.",
              color: "blue-400",
            },
            {
              icon: "🔐",
              title: "Privacy First",
              text: "Your data is secured with bank-level encryption.",
              color: "purple-400",
            },
            {
              icon: "⚡",
              title: "Instant Sync",
              text: "Access your data anytime, on any device.",
              color: "green-400",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/80 p-6 rounded-xl border border-gray-700/50 hover:border-blue-400 transition-all backdrop-blur-sm"
            >
              <div className={`text-${feature.color} text-3xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-8">
          <div className="space-x-4">
            <a
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-xl hover:shadow-blue-600/20"
            >
              Start Tracking →
            </a>
            <a
              href="/demo"
              className="border border-gray-600 hover:border-blue-400 text-gray-200 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:text-white"
            >
              Watch Demo
            </a>
          </div>

          {/* Stats */}
          <div className="flex justify-center space-x-12 text-gray-300">
            {[
              { value: "1+", label: "Active Users", color: "blue-400" },
              { value: "$1K+", label: "Managed", color: "purple-400" },
              { value: "1/7", label: "Support", color: "green-400" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`text-3xl font-bold text-${stat.color} mb-1 drop-shadow-lg`}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-400 text-sm border-t border-gray-800/50 pt-8 mx-auto w-full max-w-2xl">
          <p>© 2024 FinMaster. All rights reserved • Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
