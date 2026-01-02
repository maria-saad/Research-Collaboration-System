const express = require("express");
const router = express.Router();
const Researcher = require("../models/Researcher");

router.post("/", async (req, res) => {
  const researcher = await Researcher.create(req.body);
  res.json(researcher);
});

router.get("/", async (req, res) => {
  const researchers = await Researcher.find();
  res.json(researchers);
});

module.exports = router;
