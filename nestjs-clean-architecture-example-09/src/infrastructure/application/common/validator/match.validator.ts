import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator'

export function Match(
  propertyName: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: {
        ...validationOptions,
      },
      constraints: [propertyName],
      validator: MatchConstraints,
    })
  }
}

export class MatchConstraints implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): boolean {
    const [relatedPropertyName] = validationArguments.constraints
    const relatedValue = (validationArguments.object as any)[
      relatedPropertyName
    ]
    return value === relatedValue
  }
}
