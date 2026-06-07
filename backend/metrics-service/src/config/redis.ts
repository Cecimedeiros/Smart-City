import { createClient, RedisClientType } from 'redis';

export const METRICS_CACHE_KEY = 'smartcity:metrics:kpis';
export const REDIS_CHANNEL = 'smartcity:denuncia-status';
export const REDIS_QUEUE = 'smartcity:event-queue';

let client: RedisClientType | null = null;
let subscriber: RedisClientType | null = null;
let queueClient: RedisClientType | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
  if (!client) {
    client = createClient({ url: process.env.REDIS_URL ?? 'redis://localhost:6379' });
    client.on('error', (err) => console.error('[metrics] Redis client:', err.message));
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

// Conexão dedicada para BRPOP — comandos bloqueantes prendem a conexão inteira,
// então não pode compartilhar com getRedisClient() (usado por get/setEx/ping).
export async function getRedisQueueClient(): Promise<RedisClientType> {
  if (!queueClient) {
    queueClient = createClient({ url: process.env.REDIS_URL ?? 'redis://localhost:6379' });
    queueClient.on('error', (err) => console.error('[metrics] Redis queue client:', err.message));
    await queueClient.connect();
  }
  return queueClient;
}