import { IsString } from "class-validator";

export class sendMessageWSDto {
    @IsString()
    supportRequest: string;

    @IsString()
    text: string;
}