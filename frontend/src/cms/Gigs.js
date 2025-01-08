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
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/gigs", newGig, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGigs((prevGigs) => [...prevGigs, response.data]);
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

    const ticketInfoValue =
      ticketInfo === "Free" ? "Free" : { ticketUrl, price: ticketPrice };

    const gigData = {
      date,
      time,
      venue,
      location,
      ticketInfo: ticketInfoValue,
    };

    if (editingGig) {
      updateGig({ ...gigData, id: editingGig.id });
    } else {
      createGig(gigData);
    }

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
    setEditingGig(gig);
    setDate(gig.date);
    setTime(gig.time);
    setVenue(gig.venue);
    setLocation(gig.location);
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gig Management</h1>
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>
        )}

        <ul className="space-y-6">
          {gigs.map((gig) => (
            <li key={gig.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">{gig.venue}</h3>
              <p className="text-gray-600">
                <strong>Date:</strong> {gig.date} <br />
                <strong>Time:</strong> {gig.time} <br />
                <strong>Location:</strong> {gig.location} <br />
                <strong>Ticket Info:</strong>{" "}
                {gig.ticketInfo === "Free" ? (
                  "Free"
                ) : (
                  <a
                    href={gig.ticketInfo.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Buy Tickets - £{gig.ticketInfo.price}
                  </a>
                )}
              </p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEditGig(gig)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteGig(gig.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {editingGig ? "Edit Gig" : "Add Gig"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <select
              value={ticketInfo}
              onChange={(e) => setTicketInfo(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
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
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Ticket Price (£)"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                  required
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </>
            )}
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              {editingGig ? "Update Gig" : "Add Gig"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Gigs;
