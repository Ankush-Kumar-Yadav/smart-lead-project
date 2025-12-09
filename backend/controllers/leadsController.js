const Lead = require("../models/Lead");
const nationalizeService = require("../services/nationalizeService");
 
exports.postBatch = async (req, res) => {
  try {
    const { names } = req.body;
    if (!names) return res.status(400).json({ error: "Provide 'names' in request body."});
     
    const arr = names.split(",").map(s => s.trim()).filter(Boolean);
    const enriched = await nationalizeService.enrichNames(arr);
 
    const docs = await Promise.all(enriched.map(async item => {
      const { name, country, probability, status } = item;
      const doc = await Lead.findOneAndUpdate(
        { name: name },
        { name, country, probability, status, synced: false },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return doc;
    }));

    return res.json({ saved: docs.length, docs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
