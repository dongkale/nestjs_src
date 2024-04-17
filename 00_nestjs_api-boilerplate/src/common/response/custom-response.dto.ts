import { ApiProperty } from '@nestjs/swagger';

export class CustomResponseDto<T> {
  public static readonly SUCCESS_CODE = 0;
  public static readonly SUCCESS_STRING = 'Success';

  @ApiProperty()
  result_code: number;

  @ApiProperty()
  result_message: string;

  @ApiProperty()
  result_data: T[];
}

export function makeSuccessCustomResponseDto(result_data: any) {
  return {
    result_code: CustomResponseDto.SUCCESS_CODE,
    result_message: CustomResponseDto.SUCCESS_STRING,
    result_data: result_data,
  };
}

export function makeFailCustomResponseDto(
  result_code: number = CustomResponseDto.SUCCESS_CODE,
  result_message: string = CustomResponseDto.SUCCESS_STRING,
  result_data: any,
) {
  return {
    result_code: result_code,
    result_message: result_message,
    result_data: result_data,
  };
}
