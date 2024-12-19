import React, { useState } from "react";

const ContactForm = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset the form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Contact</h1>
      <p>
        Have questions or want to book Daniel Browne for a gig? Fill out the form below, and we’ll get back to you as soon as possible.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
            required
          />
        </div>
        <div>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
            required
          />
        </div>
        <div>
          <label htmlFor="message" style={{ display: "block", marginBottom: "5px" }}>Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "blue",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
