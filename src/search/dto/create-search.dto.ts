import { IsString } from 'class-validator';

export class CreateSearchDto {
  @IsString()
  value: string;
}
