import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CatEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier of the Cat',
    example: 0,
  })
  @Expose()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    name: 'name',
    description: 'The name of the Cat',
    example: 'Felix',
  })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiProperty({
    name: 'age',
    description: 'The age of the Cat',
    example: 1,
  })
  @Expose()
  @Type(() => Number)
  age: number;

  @ApiProperty({
    name: 'breed',
    description: 'The breed of the Cat',
    example: 'Angora',
  })
  @Expose()
  @Type(() => String)
  breed: string;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<CatEntity>) {
    Object.assign(this, partial);
  }
}
