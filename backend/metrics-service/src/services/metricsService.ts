import { Categorias, Regioes, StatusDenuncia } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { getRedisClient, METRICS_CACHE_KEY } from '../config/redis';
import { withRetry } from '../utils/retry';

export interface MetricsKpis {
  total: number;
  byCategory: Record<string, number>;
  byRegion: Record<string, number>;
  byStatus: Record<string, number>;
  updatedAt: string;
}

const CACHE_TTL_SECONDS = 300;

async function countByCategory(categoria: Categorias): Promise<[string, number]> {
  const count = await prisma.denuncia.count({ where: { categoria } });
  return [categoria, count];
}

async function countByRegion(regiao: Regioes): Promise<[string, number]> {
  const count = await prisma.denuncia.count({ where: { regiao } });
  return [regiao, count];
}

async function countByStatus(status: StatusDenuncia): Promise<[string, number]> {
  const count = await prisma.denuncia.count({ where: { status } });
  return [status, count];
}

export async function aggregateMetrics(): Promise<MetricsKpis> {
  const [total, categoryResults, regionResults, statusResults] = await Promise.all([
    prisma.denuncia.count(),
    Promise.all(Object.values(Categorias).map(countByCategory)),
    Promise.all(Object.values(Regioes).map(countByRegion)),
    Promise.all(Object.values(StatusDenuncia).map(countByStatus)),
  ]);

  return {
    total,
    byCategory: Object.fromEntries(categoryResults),
    byRegion: Object.fromEntries(regionResults),
    byStatus: Object.fromEntries(statusResults),
    updatedAt: new Date().toISOString(),
  };
}

export async function refreshMetricsCache(): Promise<MetricsKpis> {
  const metrics = await withRetry(() => aggregateMetrics());

  const redis = await getRedisClient();
  await redis.setEx(METRICS_CACHE_KEY, CACHE_TTL_SECONDS, JSON.stringify(metrics));

  return metrics;
}

export async function getMetrics(): Promise<MetricsKpis> {
  const redis = await getRedisClient();
  const cached = await redis.get(METRICS_CACHE_KEY);

  if (cached) {
    return JSON.parse(cached) as MetricsKpis;
  }

  return refreshMetricsCache();
}
