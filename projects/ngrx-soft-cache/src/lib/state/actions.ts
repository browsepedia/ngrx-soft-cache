import { createAction, props } from '@ngrx/store';
import { CachedResponse, CacheRequest } from '../models';

export const LoadCachedOrFetch = createAction('[NGRX Soft Cache] Load Cached or Fetch', props<{ urls: Array<CacheRequest> }>());
export const LoadCachedOrFetchFail = createAction('[NGRX Soft Cache] Load Cached or Fetch Fail', props<{ error: any }>());
export const LoadCachedOrFetchSuccess = createAction('[NGRX Soft Cache] Load Cached or Fetch Success', props<{ data: Array<CachedResponse<any>> }>());

export const SetItem = createAction('[NGRX Soft Cache] Set Item', props<{ key: string, data: any }>());
export const RemoveItem = createAction('[NGRX Soft Cache] Remove Item', props<{ key: string }>());

export const MarkStale = createAction('[NGRX Soft Cache] Mark as Stale', props<{ url?: string, key?: string }>());
