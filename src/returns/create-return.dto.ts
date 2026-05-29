import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateReturnDto {
  @IsNumber()
  assignmentId: number;

  @IsDateString()
  returnDate: string;

  @IsNotEmpty()
  returnCondition: string;

  @IsOptional()
  damageRemarks?: string;

  @IsOptional()
  returnSignature?: string;
}
