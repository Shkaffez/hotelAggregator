import { IsNumber, IsString } from "class-validator";
import { ID } from "src/modules/id.type";

export class searchRoomsDto {
    @IsNumber()
    public readonly limit: number;

    @IsNumber()
    public readonly offset: number;

    @IsString()
    public readonly id: ID;
}