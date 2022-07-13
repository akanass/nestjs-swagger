import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({
    name: 'name',
    description: 'The name of the Cat',
    example: 'Felix',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'age',
    description: 'The age of the Cat',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    name: 'breed',
    description: 'The breed of the Cat',
    example: 'Angora',
  })
  @IsString()
  @IsNotEmpty()
  breed: string;
}
