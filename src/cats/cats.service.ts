import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './cats.types';
import { CreateCatDto } from './dto/create-cat.dto';
import { map, mergeMap, Observable, of, tap, throwError } from 'rxjs';
import { CatEntity } from './entities/cat.entity';

@Injectable()
export class CatsService {
  // private property to store the list of cats
  private readonly _cats: Cat[];

  /**
   * Class constructor
   */
  constructor() {
    // initialise the list of cats
    this._cats = [];
  }

  /**
   * Function to add a new cat in the list
   *
   * @param {CreateCatDto} dto the data to add the new cat
   *
   * @returns {Observable<CatEntity>} the created cat
   */
  create = (dto: CreateCatDto): Observable<CatEntity> =>
    of(dto).pipe(
      tap((cat: CreateCatDto) => this._cats.push(cat)),
      map(
        (cat: CreateCatDto) =>
          new CatEntity({ ...cat, id: this._cats.length - 1 }),
      ),
    );

  /**
   * Function to return the cat from the list for the given id
   *
   * @param {number} id the identifier of the cat in the list
   *
   * @returns {Observable<CatEntity>} the cat in the list for the given id
   */
  findOne = (id: number): Observable<CatEntity> =>
    of(this._cats[id]).pipe(
      mergeMap((cat: Cat) =>
        !!cat
          ? of(new CatEntity({ ...cat, id }))
          : throwError(
              () => new NotFoundException(`Cat with id '${id}' not found`),
            ),
      ),
    );
}
