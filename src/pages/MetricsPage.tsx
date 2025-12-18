import { useState, useEffect } from 'react';

interface Metrics {
  server: {
    uptime_seconds: number;
    uptime_human: string;
    start_time: string;
  };
  requests: {
    total: number;
    errors: number;
    error_rate: number;
    avg_response_time_ms: number;
    requests_per_minute: number;
  };
  endpoints: Record<string, {
    requests: number;
    errors: number;
    avg_response_time_ms: number;
  }>;
  system: {
    cpu_percent: number;
    memory: {
      rss_mb: number;
      vms_mb: number;
      percent: number;
    };
    disk: {
      total_gb: number;
      used_gb: number;
      percent: number;
    };
  };
  hourly_requests: Record<string, number>;
}

function MetricsPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'https://agtt.cloud/api';

  const fetchMetrics = async () => {
    try {
      const response = await fetch(`${API_URL}/metrics`);
      if (!response.ok) throw new Error('Failed to fetch metrics');
      const data = await response.json();
      setMetrics(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000); // 10초마다 갱신
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading metrics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>Error: {error}</div>
        <button onClick={fetchMetrics} style={styles.refreshButton}>
          Retry
        </button>
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Server Metrics</h1>
      <p style={styles.subtitle}>Auto-refresh every 10 seconds</p>

      {/* Server Info */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Server Status</h2>
        <div style={styles.grid}>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Uptime</span>
            <span style={styles.statValue}>{metrics.server.uptime_human}</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Start Time</span>
            <span style={styles.statValue}>
              {new Date(metrics.server.start_time).toLocaleString('ko-KR')}
            </span>
          </div>
        </div>
      </div>

      {/* Request Stats */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Request Statistics</h2>
        <div style={styles.grid}>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Total Requests</span>
            <span style={styles.statValue}>{metrics.requests.total.toLocaleString()}</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Errors</span>
            <span style={{...styles.statValue, color: metrics.requests.errors > 0 ? '#ef4444' : '#22c55e'}}>
              {metrics.requests.errors} ({metrics.requests.error_rate}%)
            </span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Avg Response Time</span>
            <span style={styles.statValue}>{metrics.requests.avg_response_time_ms.toFixed(2)} ms</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Requests/min</span>
            <span style={styles.statValue}>{metrics.requests.requests_per_minute}</span>
          </div>
        </div>
      </div>

      {/* System Resources */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>System Resources</h2>
        <div style={styles.grid}>
          <div style={styles.stat}>
            <span style={styles.statLabel}>CPU Usage</span>
            <div style={styles.progressContainer}>
              <div style={{...styles.progressBar, width: `${metrics.system.cpu_percent}%`, backgroundColor: getColorByPercent(metrics.system.cpu_percent)}} />
            </div>
            <span style={styles.statValue}>{metrics.system.cpu_percent}%</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Memory Usage</span>
            <div style={styles.progressContainer}>
              <div style={{...styles.progressBar, width: `${metrics.system.memory.percent}%`, backgroundColor: getColorByPercent(metrics.system.memory.percent)}} />
            </div>
            <span style={styles.statValue}>
              {metrics.system.memory.rss_mb.toFixed(0)} MB ({metrics.system.memory.percent}%)
            </span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Disk Usage</span>
            <div style={styles.progressContainer}>
              <div style={{...styles.progressBar, width: `${metrics.system.disk.percent}%`, backgroundColor: getColorByPercent(metrics.system.disk.percent)}} />
            </div>
            <span style={styles.statValue}>
              {metrics.system.disk.used_gb.toFixed(1)} / {metrics.system.disk.total_gb.toFixed(1)} GB ({metrics.system.disk.percent}%)
            </span>
          </div>
        </div>
      </div>

      {/* Endpoint Stats */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Endpoint Statistics</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Endpoint</th>
              <th style={styles.th}>Requests</th>
              <th style={styles.th}>Errors</th>
              <th style={styles.th}>Avg Time</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(metrics.endpoints)
              .sort((a, b) => b[1].requests - a[1].requests)
              .map(([endpoint, stats]) => (
                <tr key={endpoint} style={styles.tr}>
                  <td style={styles.td}>{endpoint}</td>
                  <td style={styles.td}>{stats.requests}</td>
                  <td style={{...styles.td, color: stats.errors > 0 ? '#ef4444' : 'inherit'}}>
                    {stats.errors}
                  </td>
                  <td style={styles.td}>{stats.avg_response_time_ms.toFixed(2)} ms</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <button onClick={fetchMetrics} style={styles.refreshButton}>
        Refresh Now
      </button>
    </div>
  );
}

function getColorByPercent(percent: number): string {
  if (percent < 50) return '#22c55e';
  if (percent < 80) return '#eab308';
  return '#ef4444';
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '20px',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#374151',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  statLabel: {
    fontSize: '13px',
    color: '#6b7280',
    fontWeight: '500',
  },
  statValue: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
  },
  progressContainer: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '12px 8px',
    borderBottom: '2px solid #e5e7eb',
    fontSize: '13px',
    fontWeight: '600',
    color: '#6b7280',
  },
  tr: {
    borderBottom: '1px solid #f3f4f6',
  },
  td: {
    padding: '12px 8px',
    fontSize: '14px',
    color: '#374151',
  },
  refreshButton: {
    display: 'block',
    margin: '20px auto',
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '16px',
    color: '#6b7280',
  },
  error: {
    textAlign: 'center',
    padding: '20px',
    color: '#ef4444',
    fontSize: '16px',
  },
};

export default MetricsPage;
