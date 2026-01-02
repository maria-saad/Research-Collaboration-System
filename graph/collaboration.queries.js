export const getCollaborators = `
MATCH (r:Researcher {id: $id})-[:COLLABORATES_WITH]->(c)
RETURN c.name AS collaborator
`;

export const collaborationScore = `
MATCH (r:Researcher)-[:COLLABORATES_WITH]->(c)
RETURN r.id, COUNT(c) AS score
ORDER BY score DESC
`;
