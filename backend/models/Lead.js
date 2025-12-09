const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  country: { type: String, default: null },
  probability: { type: Number, default: 0 },
  status: { type: String, enum: ["Verified","To Check"], default: "To Check" },
  synced: { type: Boolean, default: false }, // background automation uses this
}, { timestamps: true });

module.exports = mongoose.model("Lead", LeadSchema);
