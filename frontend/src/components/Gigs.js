import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/public/components/gigs.css"; // Import CSS for Gigs component

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

  // Helper function to format date with bullet points
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const year = date.getFullYear();
    return `${day} • ${month} • ${year}`; // Combine with bullet points
  };
  
  // Helper function to format time
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = ((hours % 12) || 12).toString(); // Convert 24-hour to 12-hour
    return `${formattedHours}:${minutes} ${period}`;
  };

  // Function to handle ticketInfo display
  const renderTicketInfo = (ticketInfo) => {
    if (!ticketInfo || ticketInfo === "Free") {
      return <span>Free</span>;
    }
    if (typeof ticketInfo === "object" && ticketInfo.link) {
      return (
        <a
          href={ticketInfo.link}
          target="_blank"
          rel="noopener noreferrer"
          className="gig-ticket-link"
        >
          Buy Tickets - £{ticketInfo.price}
        </a>
      );
    }
    return <span>Free</span>;
  };

  if (error) {
    return <p className="gig-error">{error}</p>;
  }

  return (
    <div className="gigs-container">
      <h2 className="gigs-heading">Upcoming Dates</h2>
      <div className="gigs-list">
        {gigs.length > 0 ? (
          gigs.map((gig) => (
            <div className="gig-item" key={gig.id}>
              {/* Date */}
              <div className="gig-date">{formatDate(gig.date)}</div>

              {/* Venue and Location */}
              <div className="gig-details">
                <div className="gig-venue">{gig.venue}</div>
                <div className="gig-location">{gig.location}</div>
              </div>

              {/* Time and Tickets */}
              <div className="gig-meta">
                {/* Time */}
                <div className="gig-time">
                  {formatTime(gig.time)}
                </div>

                {/* Ticket Info */}
                <div className="gig-ticket-info">
                  {renderTicketInfo(gig.ticketInfo)}
                </div>
              </div>


            </div>
          ))
        ) : (
          <p className="gig-empty">No gigs available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Gigs;
