import cassandra from "cassandra-driver";

export const cassandraClient = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "research_analytics"
});
