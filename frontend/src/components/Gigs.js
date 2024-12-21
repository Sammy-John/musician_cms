import React from "react";

const Gigs = () => {
  // Placeholder gig data
  const gigs = [
    { date: "Jan 15, 2024", venue: "The Forum", location: "Los Angeles, CA", ticket: { price: "$50", link: "#" } },
    { date: "Feb 5, 2024", venue: "Madison Square Garden", location: "New York, NY", ticket: { price: "Free" } },
    { date: "Mar 22, 2024", venue: "Red Rocks Amphitheatre", location: "Denver, CO", ticket: { price: "$75", link: "#" } },
    { date: "Apr 18, 2024", venue: "The O2 Arena", location: "London, UK", ticket: { price: "Free" } },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gig Dates</h1>
      <h2>Upcoming Dates</h2>
      <div style={{ marginTop: "20px" }}>
        {gigs.map((gig, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              padding: "10px 0",
            }}
          >
            {/* Date */}
            <div style={{ flex: 1, fontWeight: "bold" }}>{gig.date}</div>

            {/* Venue and Location */}
            <div style={{ flex: 3 }}>
              <div>{gig.venue}</div>
              <div>{gig.location}</div>
            </div>

            {/* Tickets */}
            <div style={{ flex: 1, textAlign: "right" }}>
              {gig.ticket.link ? (
                <a href={gig.ticket.link} style={{ textDecoration: "none", color: "blue" }}>
                  Tickets ({gig.ticket.price})
                </a>
              ) : (
                <span>{gig.ticket.price}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gigs;
