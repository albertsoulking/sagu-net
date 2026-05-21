import { IsOptional, IsString, IsEnum } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { UserStatus } from '../entities/user.entity';

export class QueryUserDto extends PaginationDto {
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsString()
  region_id?: string;

  @IsOptional()
  @IsString()
  package_id?: string;
}
