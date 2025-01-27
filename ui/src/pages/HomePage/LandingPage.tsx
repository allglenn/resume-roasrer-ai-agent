import React from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    quote:
      "Resume Roaster helped me land my dream job at Google. The AI feedback was spot-on and helped me highlight my achievements more effectively.",
  },
  {
    name: "Michael Rodriguez",
    role: "Product Manager at Microsoft",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    quote:
      "The instant, detailed feedback transformed my resume completely. It's like having a professional resume writer available 24/7.",
  },
  {
    name: "Emily Watson",
    role: "Marketing Director at Adobe",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    quote:
      "What impressed me most was how personalized the suggestions were. It's not just generic advice - it's tailored to your industry and experience.",
  },
];

// Feature cards data with icons
const features = [
  {
    title: "Upload",
    description: "Upload your resume in PDF or Word format",
    icon: (
      <svg
        className="w-12 h-12 mx-auto text-gray-900"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
    ),
  },
  {
    title: "Analyze",
    description: "Our AI analyzes your resume for improvements",
    icon: (
      <svg
        className="w-12 h-12 mx-auto text-gray-900"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Improve",
    description: "Get detailed feedback and suggestions",
    icon: (
      <svg
        className="w-12 h-12 mx-auto text-gray-900"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">📄🔥</span>Resume Roaster
              </span>
            </div>
            <div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-all">
                Upload Your Resume
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with animation */}
      <div className="pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              Welcome to Resume Roaster
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Get AI-powered feedback to make your resume stand out
            </p>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 italic animate-fade-in">
              "Join thousands of professionals who've enhanced their careers
              with AI-powered resume feedback"
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-col sm:flex-row animate-fade-in-up">
              <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-all transform hover:scale-105 hover:shadow-xl">
                Upload Resume
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-900 text-base font-medium rounded-lg text-gray-900 bg-transparent hover:bg-gray-50 transition-all transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with dynamic cards */}
      <div className="py-12 bg-gradient-to-t from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12 animate-fade-in">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer animate-fade-in-up group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-center">
                  <div className="mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section with animations */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12 animate-fade-in">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={`${testimonial.image}?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-600">
              Created by{" "}
              <a
                href="https://glenn.allinsoftware.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-700 font-medium"
              >
                Glenn Allogho
              </a>
            </div>
            <div className="text-gray-600 flex items-center gap-2">
              Powered by{" "}
              <a
                href="https://www.together.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-700 font-medium"
              >
                Together.ai
              </a>{" "}
              &{" "}
              <a
                href="https://www.deepseek.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-700 font-medium"
              >
                DeepSeek R1
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
