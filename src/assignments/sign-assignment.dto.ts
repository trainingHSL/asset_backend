import { IsNotEmpty } from 'class-validator';

export class SignAssignmentDto {
  @IsNotEmpty()
  digitalSignature: string;
}
