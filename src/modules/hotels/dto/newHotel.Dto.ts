import { IsString } from "class-validator";

export class newHotelDto {
    @IsString()
    title: string;

    @IsString()
    description: string;
}