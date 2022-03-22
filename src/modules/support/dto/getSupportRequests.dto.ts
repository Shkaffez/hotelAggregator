import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class GetSupportRequestsDto {
  @IsNumber()
  @ApiProperty()
  limit: number;

  @IsNumber()
  @ApiProperty()
  offset: number;

  @IsBoolean()
  @ApiProperty({ default: true })
  isActive: boolean;
}
