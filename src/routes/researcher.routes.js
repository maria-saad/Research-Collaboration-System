const express = require("express");
const router = express.Router();
const Researcher = require("../models/Researcher");
const { getCombinedProfile } = require("../services/profile.service");

router.post("/", async (req, res) => {
  const researcher = await Researcher.create(req.body);
  res.json(researcher);
});

router.get("/", async (req, res) => {
  const researchers = await Researcher.find();
  res.json(researchers);
});


// NEW: Combined Profile Endpoint
router.get("/:id/profile", async (req, res) => {
  try {
    const profile = await getCombinedProfile(req.params.id);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
