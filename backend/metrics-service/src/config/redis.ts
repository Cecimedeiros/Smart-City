import { createClient, RedisClientType } from 'redis';

export const METRICS_CACHE_KEY = 'smartcity:metrics:kpis';
export const REDIS_CHANNEL = 'smartcity:denuncia-status';
export const REDIS_QUEUE = 'smartcity:event-queue';

let client: RedisClientType | null = null;
let subscriber: RedisClientType | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
  if (!client) {
    client = createClient({ url: process.env.REDIS_URL ?? 'redis://localhost:6379' });
    client.on('error', (err) => console.error('[metrics] Redis:', err.message));
    await client.connect();
  }
  return client;
}

export async function getRedisSubscriber(): Promise<RedisClientType> {
  if (!subscriber) {
    subscriber = createClient({ url: process.env.REDIS_URL ?? 'redis://localhost:6379' });
    subscriber.on('error', (err) => console.error('[metrics] Redis subscriber:', err.message));
    await subscriber.connect();
  }
  return subscriber;
}
