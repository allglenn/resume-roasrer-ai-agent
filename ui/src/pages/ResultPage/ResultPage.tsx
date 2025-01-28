import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

interface Analysis {
  summary?: string;
  strengths?: string[];
  weaknesses?: string[];
  recommendations?: string[];
  keywords_missing?: string[];
  formatting_suggestions?: string[];
  impact_score?: string;
  detailed_feedback?: {
    experience?: string;
    education?: string;
    skills?: string;
  };
  error?: string;
  raw_response?: string;
}

interface LocationState {
  analysis: Analysis;
  filename: string;
}

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const { fileId } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    if (fileId) {
      setPdfUrl(`${process.env.REACT_APP_API_URL}/files/${fileId}/view`);
    }
  }, [fileId]);

  if (!state?.analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            No analysis data available
          </h2>
          <button
            onClick={() => navigate("/upload")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to Upload
          </button>
        </div>
      </div>
    );
  }

  const { analysis, filename } = state;

  // Handle error case
  if (analysis.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />

        <div className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Analysis Error
            </h2>
            <p className="text-gray-700 mb-4">{analysis.error}</p>
            {analysis.raw_response && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-700">Raw Response:</h3>
                <pre className="mt-2 bg-gray-50 p-4 rounded overflow-auto">
                  {analysis.raw_response}
                </pre>
              </div>
            )}
            <button
              onClick={() => navigate("/upload")}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Helper function to safely check array length
  const hasItems = (arr: any[] | undefined): boolean => {
    return Array.isArray(arr) && arr.length > 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <div className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* PDF Viewer */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-4">
                  Resume: {filename}
                </h2>
                <div className="h-[800px]">
                  <iframe
                    src={pdfUrl}
                    className="w-full h-full border-0"
                    title="Resume PDF"
                  />
                </div>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                {analysis.summary && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Summary</h3>
                    <p className="text-gray-700">{analysis.summary}</p>
                  </div>
                )}

                {analysis.impact_score && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Impact Score</h3>
                    <div className="text-2xl font-bold text-gray-900">
                      {analysis.impact_score}
                    </div>
                  </div>
                )}

                {hasItems(analysis.strengths) && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Strengths</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {analysis.strengths?.map((strength, index) => (
                        <li key={index} className="text-green-700">
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {hasItems(analysis.weaknesses) && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Areas for Improvement
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {analysis.weaknesses?.map((weakness, index) => (
                        <li key={index} className="text-red-700">
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {hasItems(analysis.recommendations) && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Recommendations
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {analysis.recommendations?.map((rec, index) => (
                        <li key={index} className="text-blue-700">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {hasItems(analysis.keywords_missing) && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Missing Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywords_missing?.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.detailed_feedback && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Detailed Feedback
                    </h3>
                    <div className="space-y-4">
                      {analysis.detailed_feedback.experience && (
                        <div>
                          <h4 className="font-medium text-gray-700">
                            Experience
                          </h4>
                          <p className="text-gray-600 mt-1">
                            {analysis.detailed_feedback.experience}
                          </p>
                        </div>
                      )}
                      {analysis.detailed_feedback.education && (
                        <div>
                          <h4 className="font-medium text-gray-700">
                            Education
                          </h4>
                          <p className="text-gray-600 mt-1">
                            {analysis.detailed_feedback.education}
                          </p>
                        </div>
                      )}
                      {analysis.detailed_feedback.skills && (
                        <div>
                          <h4 className="font-medium text-gray-700">Skills</h4>
                          <p className="text-gray-600 mt-1">
                            {analysis.detailed_feedback.skills}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResultPage;
