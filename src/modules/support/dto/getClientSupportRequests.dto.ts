import { IsBoolean, IsNumber } from "class-validator";

export class getClientSupportRequestsDto {
    @IsNumber()
    limit: number;

    @IsNumber()
    offset: number;

    @IsBoolean()
    isActive: boolean;
}