import { IsString } from "class-validator";

export class createUserDto {
    @IsString()
    public readonly email: string;

    @IsString()
    public readonly password: string;

    @IsString()
    public readonly name: string;

    @IsString()
    public readonly contactPhone: string;
    
    @IsString()
    public readonly role: 'admin' | 'manager' | 'client';
}