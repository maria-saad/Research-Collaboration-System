import Researcher from "../models/Researcher.js";
import { driver } from "../config/neo4j.js";
import { getCachedProfile, setCachedProfile } from "./cache.service.js";

export const buildResearcherProfile = async (id) => {
  const cacheKey = `profile:${id}`;
  const cached = await getCachedProfile(cacheKey);
  if (cached) return JSON.parse(cached);

  const researcher = await Researcher.findById(id);
  const session = driver.session();

  const result = await session.run(
    "MATCH (r:Researcher {id: $id})-[:COLLABORATES_WITH]->(c) RETURN c.name",
    { id }
  );

  const collaborators = result.records.map(r => r.get(0));
  const profile = { researcher, collaborators };

  await setCachedProfile(cacheKey, profile);
  return profile;
};
