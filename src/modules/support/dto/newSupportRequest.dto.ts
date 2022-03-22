import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NewSupportRequestDto {
  @IsString()
  @ApiProperty()
  text: string;
}
