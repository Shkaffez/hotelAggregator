import { IsString } from 'class-validator';

export class NewSupportRequestDto {
  @IsString()
  text: string;
}
