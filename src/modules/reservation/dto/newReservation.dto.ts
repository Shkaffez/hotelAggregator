import { IsNotEmpty, IsString } from 'class-validator';

export class NewReservationDto {
  @IsString()
  @IsNotEmpty()
  hotelRoom: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;
}
