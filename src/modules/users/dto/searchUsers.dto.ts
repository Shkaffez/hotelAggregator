import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchUsersDto {
  @IsNumber()
  public readonly limit: number;

  @IsNumber()
  public readonly offset: number;

  @IsString()
  @IsOptional()
  public readonly email: string;

  @IsString()
  @IsOptional()
  public readonly name: string;

  @IsString()
  @IsOptional()
  public readonly contactPhone: string;
}
