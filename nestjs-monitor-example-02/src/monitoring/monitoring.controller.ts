import { Controller, Inject, Logger, HttpStatus, Get } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import os from 'os';

@Controller('monitoring')
export class MonitoringController {
  private readonly logger = new Logger('MonitoringController');

  constructor(
    @Inject(MonitoringService)
    private readonly monitoringService: MonitoringService,
  ) {}

  @Get('ping')
  public getPing() {
    return {
      statusCode: HttpStatus.OK,
      status: 'success',
    };
  }

  @Get('metrics')
  public getMetrics() {
    return {
      node: os.hostname(),
      metrics: this.monitoringService.getMetrics(),
    };
  }

  @Get('status')
  public getStatus() {
    return {
      node: os.hostname(),
      services: this.monitoringService.getServiceStatus(),
    };
  }

  @Get('all')
  public getAll() {
    return {
      node: os.hostname(),
      metrics: this.monitoringService.getMetrics(),
      services: this.monitoringService.getServiceStatus(),
    };
  }
}
