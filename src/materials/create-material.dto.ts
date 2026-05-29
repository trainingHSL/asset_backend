import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateMaterialDto {
  @IsNotEmpty()
  materialName: string;

  @IsNotEmpty()
  category: string;

  @IsOptional()
  brand?: string;

  @IsOptional()
  unit?: string;

  @IsNumber()
  @Min(0)
  totalQuantity: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumStockLevel?: number;

  @IsOptional()
  location?: string;
}
