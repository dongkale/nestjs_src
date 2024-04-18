export class ApiCommonResponseDto<T> {
  public static readonly SUCCESS_CODE = 0;
  public static readonly SUCCESS_STRING = 'Success';

  resultCode: number;

  resultMessage: string;

  resultData: T;

  constructor(
    resultCode: number = ApiCommonResponseDto.SUCCESS_CODE,
    resultMessage: string = ApiCommonResponseDto.SUCCESS_STRING,
    resultData: T,
  ) {
    this.resultCode = resultCode;
    this.resultMessage = resultMessage;
    this.resultData = resultData;
  }
}

// Move the static method outside of the class and remove the type parameter T
// export function makeApiCommonResponse(
//   resultCode: number = ApiCommonResponseDto.SUCCESS_CODE,
//   resultMessage: string = ApiCommonResponseDto.SUCCESS_STRING,
//   resultData: any,
// ) {
//   return {
//     resultCode: resultCode,
//     resultMessage: resultMessage,
//     resultData: resultData,
//   };
// }

export function makeSuccessApiCommonResponse(resultData: any) {
  return {
    resultCode: ApiCommonResponseDto.SUCCESS_CODE,
    resultMessage: ApiCommonResponseDto.SUCCESS_STRING,
    resultData: resultData,
  };
}

export function makeFailApiCommonResponse(
  resultCode: number = ApiCommonResponseDto.SUCCESS_CODE,
  resultMessage: string = ApiCommonResponseDto.SUCCESS_STRING,
  resultData: any,
) {
  return {
    resultCode: resultCode,
    resultMessage: resultMessage,
    resultData: resultData,
  };
}
