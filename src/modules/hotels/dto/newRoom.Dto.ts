import { IsString } from "class-validator";
import { ID } from "src/modules/id.type";

export class newRoomDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    hotelId: ID;
}