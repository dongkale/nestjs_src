import { Validator } from 'fluentvalidation-ts';
import { ValidationException } from '@/core/exceptions';
import { GetUserByNameQuery } from '@/core/usecases/get-user-by-name';

export class GetUserByNameQueryValidator extends Validator<GetUserByNameQuery> {
    private static instance: GetUserByNameQueryValidator;

    constructor() {
        super();

        this.ruleFor('name')
            .notNull()
            .withMessage('validation.user.name.blank')
            .notEmpty()
            .withMessage('validation.user.name.blank');
    }

    public static getInstance(): GetUserByNameQueryValidator {
        if (!GetUserByNameQueryValidator.instance) {
            GetUserByNameQueryValidator.instance = this.createInstance();
        }
        return GetUserByNameQueryValidator.instance;
    }

    public static createInstance(): GetUserByNameQueryValidator {
        return new GetUserByNameQueryValidator();
    }

    public static ValidateAndThrow(command: GetUserByNameQuery): void {
        const instance = GetUserByNameQueryValidator.getInstance();
        const errors = instance.validate(command);
        if ((Object.keys(errors).length === 0)) { return; }
        throw new ValidationException('common.validation.alert', [command, errors]);
    }
}
