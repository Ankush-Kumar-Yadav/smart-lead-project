const cron = require("node-cron");
const Lead = require("../models/Lead");

 
function start() {

  // Run every 5 minutes
  cron.schedule("*/5 * * * *", async () => {

    console.log("Running sync job...");

    try {
      // Get all verified but not synced leads
      const leads = await Lead.find({ status: "Verified", synced: false });

      
      for (let i = 0; i < leads.length; i++) {
        const lead = leads[i];

        console.log("Syncing:", lead.name);

        // Mark as synced
        lead.synced = true;
        await lead.save();
      }

      console.log("Sync job done.");
    } catch (error) {
      console.log("Error:", error);
    }
  });

  console.log("Cron job started. Runs every 5 minutes.");
}

module.exports = { start };
