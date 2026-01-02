const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

module.exports = app;
const researcherRoutes = require("./routes/researcher.routes");
app.use("/api/researchers", researcherRoutes);

const collaborationRoutes = require("./routes/collaboration.routes");
app.use("/api/collaborations", collaborationRoutes);
