import { IsString } from 'class-validator';
import { ID } from 'src/modules/id.type';
import { ApiProperty } from '@nestjs/swagger';

export class NewRoomDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty({ type: String })
  hotelId: ID;
}
