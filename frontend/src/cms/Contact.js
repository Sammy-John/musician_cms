import React, { useEffect, useState } from "react";
import axios from "axios";

const Contact = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all submissions on component mount
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/contact", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      });
      setSubmissions(response.data);
    } catch (err) {
      console.error("Error fetching submissions:", err.message);
      setError("Failed to fetch submissions");
    }
  };

  const deleteSubmission = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubmissions(submissions.filter((submission) => submission.id !== id));
    } catch (err) {
      console.error("Error deleting submission:", err.message);
      setError("Failed to delete submission");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Contact Submissions
        </h1>
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}
        {submissions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {submission.name}
                </h3>
                <p className="text-gray-600">
                  <strong>Email:</strong> {submission.email}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Message:</strong> {submission.message}
                </p>
                <button
                  onClick={() => deleteSubmission(submission.id)}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No contact submissions available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
