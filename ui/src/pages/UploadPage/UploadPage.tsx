import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UploadError {
  message: string;
  field?: string;
}

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [careerInterests, setCareerInterests] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<UploadError | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    validateAndSetFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File | undefined) => {
    setError(null);

    if (!file) {
      setError({ message: "Please select a file" });
      return;
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setError({ message: "Only PDF files are allowed" });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError({ message: "File size must be less than 10MB" });
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    if (careerInterests) {
      formData.append("career_interests", careerInterests);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/files/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      // Navigate to result page with analysis data
      navigate(`/result/${data.file_id}`, {
        state: {
          analysis: data.analysis,
          filename: data.filename,
        },
      });
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Failed to upload file",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <span
                className="text-2xl font-bold text-gray-900 flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <span className="text-2xl">📄🔥</span>Resume Roaster
              </span>
              <button
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Home Page
              </button>
            </div>
            <div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-all">
                Upload Your Resume
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Upload your resume
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your resume to get started and add any extra context below.
              Our AI will analyze your resume and provide personalized feedback
              to help you stand out to employers.
            </p>
          </div>

          {/* Upload Box */}
          <div
            onClick={handleCardClick}
            className={`bg-white rounded-lg border-2 border-dashed ${
              dragActive ? "border-gray-500 bg-gray-50" : "border-gray-300"
            } p-12 text-center mb-8 animate-fade-in-up relative cursor-pointer hover:bg-gray-50 transition-colors`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-900 font-medium">
                    Uploading resume...
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div className="text-gray-600">
                <span className="text-gray-900 font-medium hover:text-gray-700">
                  Click to upload
                </span>{" "}
                or drag and drop
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </div>
              <p className="text-sm text-gray-500">PDF up to 10MB</p>
              {selectedFile && (
                <p className="text-sm text-gray-900 font-medium">
                  Selected: {selectedFile.name}
                </p>
              )}
              {error && (
                <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error.message}
                </p>
              )}
            </div>
          </div>

          {/* Career Interests Textarea */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <label
              htmlFor="interests"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Describe the main purpose of your request (e.g., career
              transition, promotion, or specific industry focus)
            </label>
            <textarea
              id="interests"
              rows={4}
              value={careerInterests}
              onChange={(e) => setCareerInterests(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-600 focus:border-gray-500 focus:ring-gray-500 transition-colors"
              placeholder="E.g., I'm looking to transition from marketing to product management and want to highlight my relevant experience. I'm particularly interested in tech companies and want to emphasize my data-driven approach..."
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center animate-fade-in-up">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !selectedFile}
              className={`px-8 py-3 rounded-lg text-white font-medium transition-all transform hover:scale-105 
                ${
                  isLoading || !selectedFile
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-900 hover:bg-gray-800 hover:shadow-xl"
                }`}
            >
              {isLoading ? "Uploading..." : "Analyze Resume"}
            </button>
          </div>

          {/* Privacy Notice */}
          <p
            className="mt-4 text-center text-sm text-gray-500 animate-fade-in"
            style={{ animationDelay: "600ms" }}
          >
            By uploading your resume, you agree to our{" "}
            <a href="#" className="text-gray-900 hover:text-gray-700 underline">
              privacy policy
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
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

export default UploadPage;
