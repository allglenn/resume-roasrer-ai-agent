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

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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

      {/* Hero Section */}
      <div className="pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              Welcome to Resume Roaster
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
              Get AI-powered feedback to make your resume stand out
            </p>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 italic">
              "Join thousands of professionals who've enhanced their careers
              with AI-powered resume feedback"
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-col sm:flex-row">
              <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-all shadow-sm hover:shadow-md">
                Upload Resume
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-900 text-base font-medium rounded-lg text-gray-900 bg-transparent hover:bg-gray-50 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Upload Card */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Upload
                </h3>
                <p className="text-gray-600">
                  Upload your resume in PDF or Word format
                </p>
              </div>
            </div>

            {/* Analyze Card */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Analyze
                </h3>
                <p className="text-gray-600">
                  Our AI analyzes your resume for improvements
                </p>
              </div>
            </div>

            {/* Improve Card */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Improve
                </h3>
                <p className="text-gray-600">
                  Get detailed feedback and suggestions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all"
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
    </div>
  );
};

export default LandingPage;
