import { REDIS } from "@/lib/constants";
import { createClient } from "redis";

const client = createClient({
  url: REDIS.CLIENT,
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

async function connectRedis() {
  if (!client.isOpen) {
    console.log("Connecting to Upstash Redis...");
    await client.connect();
    console.log("Upstash Redis connected successfully.");
  }
  return client;
}

export { connectRedis, client };
