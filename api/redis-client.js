import { Redis } from '@upstash/redis';

let client = null;

export function getRedisClient() {
  if (client) return client;

  // Prioritize REST URLs (HTTP) over direct redis:// protocol
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_REST_URL || process.env.REDIS_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.REDIS_REST_TOKEN || process.env.REDIS_TOKEN;

  if (!url || !token) {
    console.warn('Redis not configured: missing URL or TOKEN env vars');
    return null;
  }

  // Only use REST API (HTTP) URLs with @upstash/redis
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    console.warn('Redis URL must be HTTP/HTTPS REST endpoint, not redis:// protocol');
    return null;
  }

  try {
    client = new Redis({ url, token });
    console.log('Redis client initialized');
    return client;
  } catch (err) {
    console.error('Failed to initialize Redis client:', err);
    return null;
  }
}

export async function getJson(key, fallback = null) {
  const r = getRedisClient();
  if (!r) return fallback;
  try {
    const v = await r.get(key);
    return v ? JSON.parse(v) : fallback;
  } catch (err) {
    console.error('Redis get error:', err);
    return fallback;
  }
}

export async function setJson(key, value) {
  const r = getRedisClient();
  if (!r) throw new Error('Redis not configured');
  try {
    await r.set(key, JSON.stringify(value));
  } catch (err) {
    console.error('Redis set error:', err);
    throw err;
  }
}
