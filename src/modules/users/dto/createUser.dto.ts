import { IsAlpha, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/utils/role.enum';

export class CreateUserDto {
  @IsString()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly contactPhone: string;

  @IsString()
  @IsOptional()
  public readonly role: Role;
}
