import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageWSDto {
  @IsString()
  @ApiProperty()
  supportRequest: string;

  @IsString()
  @ApiProperty()
  text: string;
}
