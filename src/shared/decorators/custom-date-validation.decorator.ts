import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'CustomDateValidation', async: false })
export class CustomDateValidation implements ValidatorConstraintInterface {
  validate(endDate: string, args: ValidationArguments) {
    const [startDateFieldName] = args.constraints;
    const startDate = (args.object as any)[startDateFieldName];

    if (!startDate || !endDate) {
      return false;
    }

    return new Date(startDate) <= new Date(endDate);
  }

  defaultMessage(args: ValidationArguments) {
    return `endDate (${args.value}) cannot be before startDate (${(args.object as any)[args.constraints[0]]}).`;
  }
}
