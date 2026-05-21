import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SubscriptionRulesService } from './subscription-rules.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@ApiTags('Subscription Rules')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('subscription-rules')
export class SubscriptionRulesController {
  constructor(private subscriptionRulesService: SubscriptionRulesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all subscription rules' })
  findAll() {
    return this.subscriptionRulesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create subscription rule' })
  create(@Body() dto: any, @CurrentUser('id') userId: number) {
    return this.subscriptionRulesService.create(dto, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update subscription rule' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: any, @CurrentUser('id') userId: number) {
    return this.subscriptionRulesService.update(id, dto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete subscription rule' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionRulesService.remove(id);
  }
}
