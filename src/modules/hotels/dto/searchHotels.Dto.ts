import { IsNumber, IsString } from "class-validator";

export class searchHotelsDto {
    @IsNumber()
    public readonly limit: number;

    @IsNumber()
    public readonly offset: number;
}