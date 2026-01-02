export const getTopResearchers = async (req, res) => {
  // Neo4j analytics + Cassandra precomputed scores
  res.json([
    { name: "Alice", score: 10 },
    { name: "Bob", score: 8 }
  ]);
};
