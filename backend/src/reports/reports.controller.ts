import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('revenue')
  @ApiOperation({ summary: 'Get revenue report' })
  getRevenue(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.reportsService.getRevenueReport(startDate, endDate);
  }

  @Get('expenses')
  @ApiOperation({ summary: 'Get expense report' })
  getExpenses(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.reportsService.getExpenseReport(startDate, endDate);
  }

  @Get('profit')
  @ApiOperation({ summary: 'Get profit report' })
  getProfit(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.reportsService.getProfitReport(startDate, endDate);
  }
}
