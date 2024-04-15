import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class CreateSampleDto {
  @IsString()
  @ApiProperty({ name: 'name', description: '이름', example: '이름 1' })
  name: string;

  @IsString()
  @ApiProperty({ name: 'description', description: '설명', example: '설명 1' })
  description: string;

  @IsString()
  @ApiProperty({
    name: 'data_json',
    description: 'JSON 데이터',
    example: { numver: 1, string: 'string_01' },
  })
  dataJson: string;
}

export class UpdateSampleDto {
  @IsString()
  @ApiProperty({ name: 'name', description: '이름', example: '이름 1' })
  name: string;

  @IsString()
  @ApiProperty({ name: 'description', description: '설명', example: '설명 1' })
  description: string;

  @IsString()
  @ApiProperty({
    name: 'data_json',
    description: 'JSON 데이터',
    example: { numver: 1, string: 'string_01' },
  })
  dataJson: string;
}

@Exclude()
export class ResponseSampleDto {
  @ApiProperty({ description: 'ID', example: 1 })
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty({ description: '이름', example: 'Simple 1' })
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({ description: '설명', example: 'desc 1' })
  @Expose()
  @IsString()
  description: string;

  @ApiProperty({
    description: '데이터',
    example: { number: 1, string: 'string_01' },
  })
  @Expose()
  @IsString()
  dataJson: string;
}
