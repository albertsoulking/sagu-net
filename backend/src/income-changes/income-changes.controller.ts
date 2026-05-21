import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IncomeChangesService } from './income-changes.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@ApiTags('Income Changes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('income-changes')
export class IncomeChangesController {
  constructor(private incomeChangesService: IncomeChangesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all income changes' })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.incomeChangesService.findAll(page, limit);
  }

  @Post()
  @ApiOperation({ summary: 'Create income change' })
  create(@Body() dto: any, @CurrentUser('id') userId: number) {
    return this.incomeChangesService.create(dto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete income change' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.incomeChangesService.remove(id);
  }
}
