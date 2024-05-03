import { MonitoringController } from './monitoring/monitoring.controller';
import { MonitoringService } from './monitoring/monitoring.service';
import { MonitoringModule } from './monitoring/monitoring.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  StatusMonitorConfiguration,
  StatusMonitorModule,
} from 'nest-status-monitor';
import { HealthController } from './healthController';

const statusMonitorConfig: StatusMonitorConfiguration = {
  pageTitle: 'Nest.js Monitoring Page',
  port: 3001,
  path: '/status',
  ignoreStartsWith: '/healt/alive',
  healthChecks: [
    {
      protocol: 'http',
      host: 'localhost',
      path: '/health/alive',
      port: 3001,
    },
    {
      protocol: 'http',
      host: 'localhost',
      path: '/health/dead',
      port: 3001,
    },
  ],
  spans: [
    {
      interval: 1, // Every second
      retention: 60, // Keep 60 datapoints in memory
    },
    {
      interval: 5, // Every 5 seconds
      retention: 60,
    },
    {
      interval: 15, // Every 15 seconds
      retention: 60,
    },
    {
      interval: 60, // Every 60 seconds
      retention: 600,
    },
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    responseTime: true,
    rps: true,
    statusCodes: true,
  },
};

@Module({
  imports: [MonitoringModule, StatusMonitorModule.setUp(statusMonitorConfig)],
  controllers: [AppController, HealthController, MonitoringController],
  providers: [MonitoringService, AppService],
})
export class AppModule {}
