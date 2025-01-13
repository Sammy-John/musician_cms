import React, { useState, useEffect } from "react";
import axios from "axios";

const Gigs = () => {
  const [gigs, setGigs] = useState([]); // Store fetched gigs data
  const [error, setError] = useState(null); // Error handling

  // Fetch gigs from the API on component mount
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/public-gigs");
        console.log("Fetched gigs:", response.data); // Debugging log
        setGigs(response.data);
      } catch (err) {
        console.error("Error fetching gigs:", err.message);
        setError("Failed to fetch gigs. Please try again later.");
      }
    };

    fetchGigs();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>; // Display error message if any
  }

  // Helper function to format time
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = ((hours % 12) || 12).toString(); // Convert 24-hour to 12-hour
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gig Dates</h1>
      <h2>Upcoming Dates</h2>
      <div style={{ marginTop: "20px" }}>
        {gigs.length > 0 ? (
          gigs.map((gig) => (
            <div
              key={gig.id}
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
                padding: "10px 0",
              }}
            >
              {/* Date */}
              <div style={{ flex: 1, fontWeight: "bold" }}>
                {new Date(gig.date).toLocaleDateString()}
              </div>

              {/* Venue and Location */}
              <div style={{ flex: 3 }}>
                <div>{gig.venue}</div>
                <div>{gig.location}</div>
              </div>

              {/* Time and Tickets */}
              <div style={{ flex: 2, textAlign: "right" }}>
                <div>
                  {formatTime(gig.time)}
                </div>
                <div>
                {gig.ticketInfo === "Free" ? (
  <span>Free</span>
) : gig.ticketInfo && gig.ticketInfo.ticketUrl ? (
  <a
    href={gig.ticketInfo.ticketUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 underline"
  >
    Buy Tickets - £{gig.ticketInfo.price}
  </a>
) : (
  <span>No ticket information available</span>
)}


                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No gigs available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Gigs;
