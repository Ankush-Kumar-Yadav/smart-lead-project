import React from "react";

export default function LeadTable({ leads }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        border: "1px solid #ddd"
      }}
    >
      <thead>
        <tr>
          <th style={th}>Name</th>
          <th style={th}>Country</th>
          <th style={th}>Probability</th>
          <th style={th}>Status</th>
        </tr>
      </thead>
      <tbody>
        {leads.length === 0 ? (
          <tr>
            <td colSpan="4" style={{ padding: 10, textAlign: "center" }}>
              No leads yet.
            </td>
          </tr>
        ) : (
          leads.map((lead) => (
            <tr key={lead._id}>
              <td style={td}>{lead.name}</td>
              <td style={td}>{lead.country || "-"}</td>
              <td style={td}>{lead.probability.toFixed(2)}</td>
              <td style={td}>{lead.status}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

const th = {
  padding: 10,
  textAlign: "left",
  borderBottom: "1px solid #ccc"
};

const td = {
  padding: 10,
  borderBottom: "1px solid #eee"
};
