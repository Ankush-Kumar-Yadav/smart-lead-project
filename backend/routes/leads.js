const express = require("express");
const router = express.Router();
const controller = require("../controllers/leadsController");

router.post("/batch", controller.postBatch);
router.get("/", controller.getLeads);

module.exports = router;
