const Researcher = require("../models/Researcher");
const driver = require("../config/neo4j");
const { getCachedData, setCachedData } = require("./cache.service");

const getCombinedProfile = async (id) => {
  const cacheKey = `profile:${id}`;

  // 1. Check Redis first
  const cached = await getCachedData(cacheKey);
  if (cached) return cached;

  // 2. MongoDB: researcher info
  const researcher = await Researcher.findById(id).lean();

  // 3. Neo4j: collaborators
  const session = driver.session();
  const result = await session.run(
    `MATCH (r:Researcher {id: $id})-[:COLLABORATES_WITH]->(c)
     RETURN c.id AS collaboratorId, c.name AS collaboratorName`,
    { id }
  );

  const collaborators = result.records.map(r => ({
    id: r.get("collaboratorId"),
    name: r.get("collaboratorName")
  }));

  const profile = { researcher, collaborators };

  // 4. Cache in Redis
  await setCachedData(cacheKey, profile);

  return profile;
};

module.exports = { getCombinedProfile };
