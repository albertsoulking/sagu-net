import { Controller, Get, Post, Body, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@ApiTags('Subscriptions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all subscriptions' })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.subscriptionsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subscription by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create subscription' })
  create(@Body() dto: CreateSubscriptionDto, @CurrentUser('id') userId: number) {
    return this.subscriptionsService.create(dto, userId);
  }
}
