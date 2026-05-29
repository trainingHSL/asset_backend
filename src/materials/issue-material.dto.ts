import { IsNumber, IsOptional, Min } from 'class-validator';

export class IssueMaterialDto {
  @IsNumber()
  materialId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsOptional()
  remarks?: string;
}
