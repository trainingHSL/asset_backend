import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAssignmentDto {
  @IsNumber()
  assetId: number;

  @IsNumber()
  userId: number;

  @IsDateString()
  assignedDate: string;

  @IsOptional()
  @IsDateString()
  expectedReturnDate?: string;

  @IsOptional()
  remarks?: string;
}
