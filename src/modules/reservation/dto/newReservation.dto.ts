import { IsNotEmpty, IsString } from "class-validator";

export class newReservationDto {
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