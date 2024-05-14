import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

export function IsExists(
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
      validator: IsExistsConstraints,
    })
  }
}

@ValidatorConstraint({ name: 'IsExists' })
export class IsExistsConstraints implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    try {
      const [key, repo] = args.constraints
      const isExists = await repo.count({
        where: {
          [key]: value,
        },
        cache: {
          miliseconds: 30000,
        },
      })

      return isExists > 0
    } catch (error) {
      return false
    }
  }
}
