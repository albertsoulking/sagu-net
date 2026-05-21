import { IsString, IsNumber, IsOptional, IsDateString, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @IsNumber()
  @Min(0)
  unit_price: number;

  @IsOptional()
  @IsString()
  payment_type?: string;

  @IsOptional()
  @IsDateString()
  expense_date?: string;
}
