import { IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  package_id: number;

  @IsOptional()
  @IsString()
  payment_type?: string;

  @IsNumber()
  months: number;

  @IsOptional()
  @IsNumber()
  discount_percent?: number;

  @IsOptional()
  @IsNumber()
  extra_months?: number;

  @IsOptional()
  @IsNumber()
  installation_fee?: number;

  @IsOptional()
  @IsNumber()
  cable_fee?: number;

  @IsOptional()
  @IsNumber()
  total_amount?: number;

  @IsOptional()
  @IsDateString()
  start_date?: string;
}
