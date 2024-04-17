export class ApiCommonResponseDto<T> {
  public static readonly SUCCESS_CODE = 0;
  public static readonly SUCCESS_STRING = 'Success';

  result_code: number;

  result_message: string;

  result_data: T;

  constructor(
    result_code: number = ApiCommonResponseDto.SUCCESS_CODE,
    result_message: string = ApiCommonResponseDto.SUCCESS_STRING,
    result_data: T,
  ) {
    this.result_code = result_code;
    this.result_message = result_message;
    this.result_data = result_data;
  }
}

// Move the static method outside of the class and remove the type parameter T
// export function makeApiCommonResponse(
//   result_code: number = ApiCommonResponseDto.SUCCESS_CODE,
//   result_message: string = ApiCommonResponseDto.SUCCESS_STRING,
//   result_data: any,
// ) {
//   return {
//     result_code: result_code,
//     result_message: result_message,
//     result_data: result_data,
//   };
// }

export function makeSuccessApiCommonResponse(result_data: any) {
  return {
    result_code: ApiCommonResponseDto.SUCCESS_CODE,
    result_message: ApiCommonResponseDto.SUCCESS_STRING,
    result_data: result_data,
  };
}

export function makeFailApiCommonResponse(
  result_code: number = ApiCommonResponseDto.SUCCESS_CODE,
  result_message: string = ApiCommonResponseDto.SUCCESS_STRING,
  result_data: any,
) {
  return {
    result_code: result_code,
    result_message: result_message,
    result_data: result_data,
  };
}
