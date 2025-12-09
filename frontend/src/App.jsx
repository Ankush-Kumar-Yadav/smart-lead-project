import React, { useEffect, useState } from "react";
import axios from "axios";
import LeadTable from "./components/LeadTable";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export default function App() {
  const [names, setNames] = useState("");
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    try {
      const q = filter === "all" ? "" : `?status=${filter}`;
      const res = await axios.get(`${API_BASE}/api/leads${q}`);
      setLeads(res.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const submitBatch = async (e) => {
    e.preventDefault();
    if (!names.trim()) return alert("Please enter some names!");

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/leads/batch`, { names });
      setNames("");
      fetchLeads();
    } catch (err) {
      console.error(err);
      alert("Error submitting data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
    const timer = setInterval(fetchLeads, 5000);
    return () => clearInterval(timer);
  }, [filter]);

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto", fontFamily: "Arial" }}>
      <h1>Smart Lead Dashboard</h1>

      <form onSubmit={submitBatch} style={{ marginBottom: 20 }}>
        <label>Enter names (comma-separated):</label>
        <textarea
          placeholder="Peter, Aditi, Ravi, Satoshi"
          value={names}
          onChange={(e) => setNames(e.target.value)}
          rows="3"
          style={{
            width: "100%",
            padding: 10,
            marginTop: 5,
            borderRadius: 5,
            border: "1px solid #ccc"
          }}
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 10,
            padding: "10px 20px",
            cursor: "pointer"
          }}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      <div style={{ marginBottom: 20 }}>
        <label>Filter by Status:&nbsp;</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="Verified">Verified</option>
          <option value="To Check">To Check</option>
        </select>
      </div>

      <LeadTable leads={leads} />
    </div>
  );
}
