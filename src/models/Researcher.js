const mongoose = require("mongoose");

const ResearcherSchema = new mongoose.Schema({
  name: String,
  institution: String,
  interests: [String]
});

module.exports = mongoose.model("Researcher", ResearcherSchema);
