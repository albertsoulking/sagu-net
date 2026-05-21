import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstallationRulesController } from './installation-rules.controller';
import { InstallationRulesService } from './installation-rules.service';
import { InstallationRule } from './entities/installation-rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstallationRule])],
  controllers: [InstallationRulesController],
  providers: [InstallationRulesService],
})
export class InstallationRulesModule {}
