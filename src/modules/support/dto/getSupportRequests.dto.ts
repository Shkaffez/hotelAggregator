import { IsBoolean, IsNumber } from 'class-validator';

export class GetSupportRequestsDto {
  @IsNumber()
  limit: number;

  @IsNumber()
  offset: number;

  @IsBoolean()
  isActive: boolean;
}
