import React, { useState, useEffect } from "react";
import axios from "axios";

const Gigs = () => {
  const [gigs, setGigs] = useState([]);
  const [error, setError] = useState(null);
  const [editingGig, setEditingGig] = useState(null);

  // Form fields
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [location, setLocation] = useState("");
  const [ticketInfo, setTicketInfo] = useState("Free");
  const [ticketUrl, setTicketUrl] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");

  // Fetch all gigs on component mount
  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/gigs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGigs(response.data);
    } catch (err) {
      console.error("Error fetching gigs:", err.message);
      setError("Failed to fetch gigs");
    }
  };

  const createGig = async (newGig) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token for authentication
      const response = await axios.post("http://localhost:5000/api/gigs", newGig, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGigs((prevGigs) => [...prevGigs, response.data]); // Add the new gig to the list
    } catch (err) {
      console.error("Error creating gig:", err.message);
      setError("Failed to create gig");
    }
  };
  

  const updateGig = async (updatedGig) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/gigs/${updatedGig.id}`, updatedGig, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGigs(gigs.map((gig) => (gig.id === updatedGig.id ? updatedGig : gig)));
      setEditingGig(null);
    } catch (err) {
      console.error("Error updating gig:", err.message);
      setError("Failed to update gig");
    }
  };

  const deleteGig = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/gigs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGigs(gigs.filter((gig) => gig.id !== id));
    } catch (err) {
      console.error("Error deleting gig:", err.message);
      setError("Failed to delete gig");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Construct ticketInfo
    const ticketInfoValue =
      ticketInfo === "Free" ? "Free" : { ticketUrl, price: ticketPrice };
  
    // Prepare gig data
    const gigData = {
      date,
      time,
      venue,
      location,
      ticketInfo: ticketInfoValue,
    };
  
    if (editingGig) {
      // Update existing gig
      updateGig({ ...gigData, id: editingGig.id });
    } else {
      // Create a new gig
      createGig(gigData);
    }
  
    // Reset form after submission
    setDate("");
    setTime("");
    setVenue("");
    setLocation("");
    setTicketInfo("Free");
    setTicketUrl("");
    setTicketPrice("");
    setEditingGig(null);
  };
  
  

  const handleEditGig = (gig) => {
    setEditingGig(gig); // Set the gig to edit
    setDate(gig.date); // Prepopulate the date field
    setTime(gig.time); // Prepopulate the time field
    setVenue(gig.venue); // Prepopulate the venue field
    setLocation(gig.location); // Prepopulate the location field
    if (gig.ticketInfo === "Free") {
      setTicketInfo("Free");
      setTicketUrl("");
      setTicketPrice("");
    } else {
      setTicketInfo("Paid");
      setTicketUrl(gig.ticketInfo.ticketUrl);
      setTicketPrice(gig.ticketInfo.price);
    }
  };
  

  return (
    <div>
      <h1>Gig Management</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {gigs.map((gig) => (
          <li key={gig.id}>
            <h3>{gig.venue}</h3>
            <p>
              <strong>Date:</strong> {gig.date} <br />
              <strong>Time:</strong> {gig.time} <br />
              <strong>Location:</strong> {gig.location} <br />
              <strong>Ticket Info:</strong>{" "}
              {gig.ticketInfo === "Free" ? (
                "Free"
              ) : (
                <a href={gig.ticketInfo.ticketUrl} target="_blank" rel="noopener noreferrer">
                  Buy Tickets - £{gig.ticketInfo.price}
                </a>
              )}
            </p>
            <button onClick={() => handleEditGig(gig)}>Edit</button>
            <button onClick={() => deleteGig(gig.id)}>Delete</button>
          </li>
        ))}
      </ul>



      <form onSubmit={handleSubmit}>
        <h2>{editingGig ? "Edit Gig" : "Add Gig"}</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <select
          value={ticketInfo}
          onChange={(e) => setTicketInfo(e.target.value)}
        >
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>
        {ticketInfo === "Paid" && (
          <>
            <input
              type="url"
              placeholder="Ticket URL"
              value={ticketUrl}
              onChange={(e) => setTicketUrl(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Ticket Price"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              required
            />
          </>
        )}
        <button type="submit">{editingGig ? "Update Gig" : "Add Gig"}</button>
      </form>
    </div>
  );
};

export default Gigs;
