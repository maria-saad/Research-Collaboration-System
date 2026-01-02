const driver = require("../config/neo4j");

const session = driver.session();

const addCollaboration = async (researcherId1, researcherId2) => {
  const query = `
    MERGE (a:Researcher {id: $id1})
    MERGE (b:Researcher {id: $id2})
    MERGE (a)-[c:COLLABORATES_WITH]->(b)
    ON CREATE SET c.weight = 1
    ON MATCH SET c.weight = c.weight + 1
    RETURN c
  `;

  const result = await session.run(query, {
    id1: researcherId1,
    id2: researcherId2
  });

  return result.records;
};

module.exports = { addCollaboration };
