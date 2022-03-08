import { IsString } from 'class-validator';

export class SendMessageWSDto {
  @IsString()
  supportRequest: string;

  @IsString()
  text: string;
}
