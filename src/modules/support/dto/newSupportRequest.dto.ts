import { IsString } from "class-validator";

export class newSupportRequestDto {
    @IsString()
    text: string;
}