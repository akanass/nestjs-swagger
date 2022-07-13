import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCatDto } from './dto/create-cat.dto';
import { Observable } from 'rxjs';
import { CatEntity } from './entities/cat.entity';

@ApiTags('cats')
@Controller('cats')
@UseInterceptors(ClassSerializerInterceptor)
export class CatsController {
  /**
   * Class constructor
   * @param {CatsService} _catsService instance of CatsService injected in the controller
   */
  constructor(private readonly _catsService: CatsService) {}

  /**
   * Handler to answer to POST /cats route
   *
   * @param {CreateCatDto} createCatDto data to create the cat
   *
   * @returns {Observable<CatEntity>} the created cat
   */
  @ApiBadRequestResponse({
    description: 'Payload provided is not good',
  })
  @ApiBody({
    description: 'Payload to create a new Cat',
    type: CreateCatDto,
  })
  @ApiCreatedResponse({
    description: 'The Cat has been successfully created',
    type: CatEntity,
  })
  @Post()
  create(@Body() createCatDto: CreateCatDto): Observable<CatEntity> {
    return this._catsService.create(createCatDto);
  }

  /**
   * Handler to answer to GET /cats/:id route
   *
   * @param {number} id the identifier of the cat in the list
   *
   * @returns {Observable<CatEntity>} the cat from the list for the given id
   */
  @ApiBadRequestResponse({
    description: 'Payload provided is not good',
  })
  @ApiNotFoundResponse({
    description: 'Cat with the given "id" doesn\'t exist',
  })
  @ApiParam({
    name: 'id',
    description: 'The id attached to the Cat',
    type: Number,
    allowEmptyValue: false,
  })
  @ApiOkResponse({
    description: 'Returns the cat for the given "id"',
    type: CatEntity,
  })
  @Get(':id')
  findOne(@Param('id') id: number): Observable<CatEntity | never> {
    return this._catsService.findOne(id);
  }
}
