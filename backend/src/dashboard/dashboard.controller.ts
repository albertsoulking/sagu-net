import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Get dashboard summary' })
  getSummary() {
    return this.dashboardService.getSummary();
  }

  @Get('charts')
  @ApiOperation({ summary: 'Get dashboard charts' })
  getCharts() {
    return this.dashboardService.getCharts();
  }

  @Get('recent-activities')
  @ApiOperation({ summary: 'Get recent activities' })
  getRecentActivities() {
    return this.dashboardService.getRecentActivities();
  }
}
