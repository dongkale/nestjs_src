import { Logger, Injectable } from '@nestjs/common';

export type MonitorFunction = () => string;
export type MetricFunction = () => any;
export type ServiceStatus =
  | 'initializing'
  | 'ready'
  | 'error'
  | 'recovering'
  | 'shutting-down'
  | 'shutdown';

@Injectable()
export class MonitoringService {
  private logger = new Logger('MonitoringService');
  private usage = {
    cpu: process.cpuUsage(),
    mem: process.memoryUsage(),
  };
  private monitors: MonitorFunction[] = [];
  private metricers: { category: string; fn: MetricFunction }[] = [];
  private statuses: {
    [service: string]: { status: ServiceStatus; timestamp: Date };
  } = {};

  private readonly intervalLogger: NodeJS.Timeout;
  constructor() {
    this.monitors.push(this.resourceLogger.bind(this));
    this.registerMetric('resources', this.resourceMetric.bind(this));
    this.intervalLogger = setInterval(
      () => {
        try {
          this.logger.log(this.monitors.map((monitor) => monitor()).join('; '));
        } catch (err) {
          this.logger.error(err);
        }
      },
      process.env.MONITORING_INTERVAL
        ? Number.parseInt(process.env.MONITORING_INTERVAL)
        : 10 * 1000,
    );
  }

  private resourceLogger() {
    const { cpu, mem } = {
      cpu: process.cpuUsage(),
      mem: process.memoryUsage(),
    };

    return `CPU sys/user: ${(cpu.system / 1000000).toFixed(2)}s/${(cpu.user / 1000000).toFixed(2)}s Memory: HeapTotal: ${(
      mem.heapTotal / 1000000
    ).toFixed(
      2,
    )}M, used: ${(mem.heapUsed / 1000000).toFixed(2)}M, RSS: ${(mem.rss / 1000000).toFixed(2)}M`;
  }

  private resourceMetric() {
    const { cpu, mem } = {
      cpu: process.cpuUsage(),
      mem: process.memoryUsage(),
    };

    return {
      resources: {
        cpu: {
          system: (cpu.system / 1000000).toFixed(2),
          user: (cpu.user / 1000000).toFixed(2),
        },
        memory: {
          total: (mem.heapTotal / 1000000).toFixed(2),
          used: (mem.heapUsed / 1000000).toFixed(2),
          rss: (mem.rss / 1000000).toFixed(2),
        },
      },
    };
  }

  public setStatus(service: string, status: ServiceStatus) {
    this.statuses[service] = {
      status: status,
      timestamp: new Date(),
    };
  }

  /**
   * Registers a log reporter
   *
   * @param fn A callback that returns a loggable string
   */
  public registerLogger(fn: MonitorFunction) {
    this.monitors.push(fn);
  }

  /**
   * Registers a metric reporter
   *
   * @param category The category to report this metric in (e.g. 'MyService')
   * @param fn A callback that returns an object to report to metrics consumers
   */
  public registerMetric(category: string, fn: MetricFunction) {
    this.metricers.push({ category: category, fn: fn });
  }

  /**
   * Returns information about the host and the metrics reported by all registered metric reporters.
   *
   * Typically called by the @see MonitoringController
   */
  public getMetrics() {
    let r = {};
    this.metricers.forEach((m) => {
      r[m.category] = m.fn();
    });
    return r;
  }

  /**
   * Returns status information about registered services
   */
  public getServiceStatus() {
    return this.statuses;
  }
}
