import { createClient } from 'redis';

let client = null;
let connected = false;

export async function getRedisClient() {
  // Return existing client if already connected
  if (client && connected) return client;

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    console.warn('Redis not configured: missing REDIS_URL env var');
    return null;
  }

  try {
    client = createClient({ url: redisUrl });
    
    client.on('error', err => {
      console.error('Redis client error:', err);
      connected = false;
    });

    client.on('connect', () => {
      console.log('Redis connected');
      connected = true;
    });

    await client.connect();
    connected = true;
    console.log('Redis client initialized and connected');
    return client;
  } catch (err) {
    console.error('Failed to initialize Redis client:', err);
    connected = false;
    return null;
  }
}

export async function getJson(key, fallback = null) {
  try {
    const r = await getRedisClient();
    if (!r) return fallback;
    const v = await r.get(key);
    return v ? JSON.parse(v) : fallback;
  } catch (err) {
    console.error('Redis get error:', err);
    return fallback;
  }
}

export async function setJson(key, value) {
  try {
    const r = await getRedisClient();
    if (!r) throw new Error('Redis not configured');
    await r.set(key, JSON.stringify(value));
  } catch (err) {
    console.error('Redis set error:', err);
    throw err;
  }
}
