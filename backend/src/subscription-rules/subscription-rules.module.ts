import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionRulesController } from './subscription-rules.controller';
import { SubscriptionRulesService } from './subscription-rules.service';
import { SubscriptionRule } from './entities/subscription-rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionRule])],
  controllers: [SubscriptionRulesController],
  providers: [SubscriptionRulesService],
})
export class SubscriptionRulesModule {}
