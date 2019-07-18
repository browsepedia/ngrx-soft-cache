import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { NgrxSoftCacheService } from '../service';

import * as actions from './actions';
import { HttpErrorResponse } from '@angular/common/http';
import { CachedResponse } from '../models';

@Injectable()
export class NgrxSoftCacheEffects {
  constructor(
    private actions$: Actions,
    private service: NgrxSoftCacheService
  ) { }

  loadFromCacheOrFetch$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.LoadCachedOrFetch),
    mergeMap(({ urls }) => this.service.loadCachedOrFetch(urls).pipe(
      map((data: Array<CachedResponse<any>>) => actions.LoadCachedOrFetchSuccess({ data })),
      catchError((error: HttpErrorResponse) => of(actions.LoadCachedOrFetchFail({ error })))
    ))
  ));
}