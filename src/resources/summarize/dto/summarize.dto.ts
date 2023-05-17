import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SummarizeDto {
  @IsString()
  @IsOptional()
  question?: string;
  @IsString()
  @IsNotEmpty()
  text: string;
}
