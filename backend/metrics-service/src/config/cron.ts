import cron from 'node-cron';
import { refreshMetricsCache } from '../services/metricsService';

export function startMetricsCron() {
  cron.schedule('*/5 * * * *', async () => {
    try {
      await refreshMetricsCache();
      console.log('[metrics] KPIs atualizados via cron');
    } catch (err) {
      console.error('[metrics] Erro no cron de KPIs:', err);
    }
  });
}
