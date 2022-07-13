import { Controller, Get, Options } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Controller()
export class AppController {
  /**
   * Handler to prevent 404 error when requesting favicon.ico
   */
  @Get('favicon.ico')
  favicon(): Observable<undefined> {
    return of(undefined);
  }

  /**
   * Handler to answer to all OPTIONS route
   */
  @Options('*')
  options(): Observable<void> {
    return of(undefined);
  }
}
