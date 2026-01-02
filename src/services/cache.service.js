import { redis } from "../config/redis.js";

export const getCachedProfile = async (key) => {
  return await redis.get(key);
};

export const setCachedProfile = async (key, data) => {
  await redis.setex(key, 300, JSON.stringify(data));
};
