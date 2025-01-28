import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Made with ❤️ by</span>
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
  );
};

export default Footer;
