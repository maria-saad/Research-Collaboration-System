const express = require("express");
const router = express.Router();
const { addCollaboration } = require("../services/collaboration.service");
const driver = require("../config/neo4j"); // needed for GET endpoint

// POST: add a collaboration between two researchers
router.post("/", async (req, res) => {
  const { researcher1, researcher2 } = req.body;
  const result = await addCollaboration(researcher1, researcher2);
  res.json({ message: "Collaboration added", result });
});

// GET: fetch all collaborators for a given researcher
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const session = driver.session();

  const query = `
    MATCH (r:Researcher {id: $id})-[:COLLABORATES_WITH]->(c)
    RETURN c.id AS collaboratorId, c.name AS collaboratorName
  `;
  const result = await session.run(query, { id });
  const collaborators = result.records.map(r => ({
    id: r.get("collaboratorId"),
    name: r.get("collaboratorName")
  }));

  res.json(collaborators);
});

module.exports = router;
