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
    <div>
      <h1>Contact Submissions</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {submissions.map((submission) => (
          <li key={submission.id}>
            <h3>{submission.name}</h3>
            <p>Email: {submission.email}</p>
            <p>Message: {submission.message}</p>
            <button onClick={() => deleteSubmission(submission.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contact;
