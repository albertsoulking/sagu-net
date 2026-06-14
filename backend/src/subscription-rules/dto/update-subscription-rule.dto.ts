import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionRuleDto } from './create-subscription-rule.dto';

export class UpdateSubscriptionRuleDto extends PartialType(CreateSubscriptionRuleDto) {}
