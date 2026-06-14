import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionRuleDto {
  @ApiProperty({ example: '6 + 1 Months Promotion' })
  @IsString()
  name: string;

  @ApiProperty({ example: 6 })
  @IsNumber()
  @Min(1)
  min_months: number;

  @ApiProperty({ example: 10, description: '折扣百分比, 例如 10 代表打 9 折' })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  discount_percent: number;

  @ApiProperty({ example: 1, default: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  extra_months: number;

  @ApiProperty({ example: 'Pay 6 months get 1 month free', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
