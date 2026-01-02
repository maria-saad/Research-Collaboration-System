const redis = require("../config/redis");

// Get cached data by key
const getCachedData = async (key) => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

// Set cache with TTL (5 minutes)
const setCachedData = async (key, value) => {
  await redis.setex(key, 300, JSON.stringify(value));
};

module.exports = { getCachedData, setCachedData };
