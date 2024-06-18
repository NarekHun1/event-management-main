import { IsDateString, IsNotEmpty, IsString, Validate } from 'class-validator';
import { CustomDateValidation } from '../shared';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  @Validate(CustomDateValidation, ['startDate'])
  endDate: string;
}
