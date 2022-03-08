import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ID } from 'src/modules/id.type';

export class SearchRoomsDto {
  @IsNumber()
  @IsOptional()
  public readonly limit: number;

  @IsNumber()
  @IsOptional()
  public readonly offset: number;

  @IsString()
  public readonly id: ID;
}
