import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

export function IsUnique(
  key: string,
  repository: any,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: {
        ...validationOptions,
      },
      constraints: [key, repository],
      validator: IsUniqueConstraints,
    })
  }
}

@ValidatorConstraint({ name: 'IsUnique' })
export class IsUniqueConstraints implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    try {
      const [key, repo] = args.constraints
      const isExists = await repo.countBy({
        [key]: value,
      })

      return isExists.length < 0
    } catch (error) {
      return false
    }
  }
}
