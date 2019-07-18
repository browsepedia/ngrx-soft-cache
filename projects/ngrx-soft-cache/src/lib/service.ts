import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, take, mergeMap } from 'rxjs/operators';
import { CachedResponse, CacheRequest } from './models';
import { Store } from '@ngrx/store';
import { NgrxSoftCacheState } from './state/state';

import * as selectors from './state/selectors';

@Injectable()
export class NgrxSoftCacheService {
  constructor(private http: HttpClient, private store: Store<NgrxSoftCacheState>) { }

  loadCachedOrFetch<T>(cacheRequests: Array<CacheRequest>): Observable<Array<CachedResponse<T>>> {
    return this.store.select(selectors.featureSelector).pipe(
      take(1),
      mergeMap((state: NgrxSoftCacheState) => forkJoin(cacheRequests.map(cacheRequest => {
        if (!state[cacheRequest.url] || state[cacheRequest.url].stale) {
          return this.load(cacheRequest);
        }
        return of(state[cacheRequest.url].data);
      })).pipe(
        map((values: Array<CachedResponse<T>>) =>
          values.reduce((acc: any, current: CachedResponse<T>, index: number) => ({
            ...acc,
            [cacheRequests[index].url]: current
          }), {}))
      ))
    );
  }

  load<T>(cacheRequest: CacheRequest): Observable<CachedResponse<T>> {
    if (!cacheRequest.method || cacheRequest.method === 'get') {
      return this.http.get<T>(cacheRequest.url).pipe(
        map(data => ({ data, stale: false } as CachedResponse<T>))
      );
    } else {
      return this.http.post<T>(cacheRequest.url, cacheRequest.body).pipe(
        map(data => ({ data, stale: false } as CachedResponse<T>))
      );
    }
  }
}