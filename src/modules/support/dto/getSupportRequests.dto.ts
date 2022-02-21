import { IsBoolean, IsNumber } from "class-validator";

export class getSupportRequestsDto {
    @IsNumber()
    limit: number;

    @IsNumber()
    offset: number;

    @IsBoolean()
    isActive: boolean;
}