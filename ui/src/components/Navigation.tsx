import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-gray-900">
                Resume Roaster
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/upload"
              className="px-4 py-2 rounded-md text-gray-500 hover:text-gray-900"
            >
              Upload Resume
            </Link>
            <a
              href="https://github.com/allglenn/resume-roasrer-ai-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
