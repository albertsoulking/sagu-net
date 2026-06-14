import { PartialType } from '@nestjs/swagger';
import { CreateInstallationRuleDto } from './create-installation-rule.dto';

export class UpdateInstallationRuleDto extends PartialType(CreateInstallationRuleDto) {}
