import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeChangesController } from './income-changes.controller';
import { IncomeChangesService } from './income-changes.service';
import { IncomeChange } from './entities/income-change.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeChange])],
  controllers: [IncomeChangesController],
  providers: [IncomeChangesService],
})
export class IncomeChangesModule {}
