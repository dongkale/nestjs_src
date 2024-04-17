// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const JsonStringCheck = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     const value = request.body;

//     try {
//       JSON.parse(value);
//       return value;
//     } catch (error) {
//       throw new Error('Invalid JSON string');
//     }
//   },
// );

import { registerDecorator } from 'class-validator';

// export function JsonStringCheck(
//   property: string,
//   validationOptions?: ValidationOptions,
// ) {
//   // 데커레이터의 인수는 객체에서 참조하려고 하는 다른 속성의 이름과 ValidationOptions 을 받음
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   return (object: Object, propertyName: string) => {
//     // registerDecorator 를 호출하는 함수 리턴, 이 함수의 인수로 데커레이터가 선언될 객체와 속성 이름 받음
//     registerDecorator({
//       // registerDecorator 는 ValidationDecoratorOptions 객체를 인수로 받음
//       name: 'NotIn', // 데커레이터 이름
//       target: object.constructor, // 이 데커레이터는 객체가 생성될 때 적용됨.
//       propertyName,
//       options: validationOptions, // 유효성 옵션은 데커레이터의 인수로 전달받은 것을 사용
//       constraints: [property], //  이 데커레이터는 속성에 적용되도록 제약을 줌
//       validator: {
//         // validator 속성 안에 유효성 검사 규칙 기술, 이는 ValidatorConstraint Interface 를 구현한 함수
//         validate(
//           value: any,
//           validationArguments?: ValidationArguments,
//         ): Promise<boolean> | boolean {
//           const [relatedPropertyName] = validationArguments.constraints;
//           const relatedValue = (validationArguments.object as any)[
//             relatedPropertyName
//           ];
//           return (
//             typeof value === 'string' &&
//             typeof relatedValue === 'string' &&
//             !relatedValue.includes(value)
//           );
//         },
//       },
//     });
//   };
// }

// export function JsonStringCheck(
//   property: string,
//   validationOptions?: ValidationOptions,
// ) {
//   return (object: object, propertyName: string) => {
//     registerDecorator({
//       name: 'JsonStringCheck',
//       target: object.constructor,
//       propertyName,
//       options: validationOptions,
//       constraints: [property],
//       validator: {
//         validate(value: any, args: ValidationArguments) {
//           const [relatedPropertyName] = args.constraints;
//           const relatedValue = (args.object as any)[relatedPropertyName];
//           return (
//             typeof value === 'string' &&
//             typeof relatedValue === 'string' &&
//             value.length > relatedValue.length
//           );
//         },
//       },
//     });
//   };
// }

export function JsonStringCheck() {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'JsonStringCheck',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'Invalid JSON string',
      },
      validator: {
        validate(value: any) {
          try {
            JSON.parse(value);
            return value;
          } catch (error) {
            throw new Error('Invalid JSON string');
          }
        },
      },
    });
  };
}
