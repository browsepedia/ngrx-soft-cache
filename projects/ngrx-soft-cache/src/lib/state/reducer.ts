import { NgrxSoftCacheState } from './state';
import { createReducer, on, Action } from '@ngrx/store';
import * as actions from './actions';
import { CachedResponse } from '../models';

const initialState: NgrxSoftCacheState = {};

const ngrxCacheReducer = createReducer(
  initialState,
  on(actions.MarkStale, (state, { url, key }) => {
    const itemKey = url ? url : key;

    return {
      ...state,
      data: {
        ...state.data,
        [itemKey]: undefined
      }
    };
  }),
  on(actions.LoadCachedOrFetchSuccess, (state, { data }) => ({
    ...state,
    ...Object.keys(data).reduce((acc: any, current: string) => ({
      ...acc,
      [current]: { data: data[current].data, stale: false } as CachedResponse<any>
    }), {})
  })),

  on(actions.SetItem, (state, { key, data }) => ({
    ...state, [key]: { data, stale: false } as CachedResponse<any>
  })),

  on(actions.RemoveItem, (state, { key }) => ({ ...state, [key]: undefined }))
);

export function reducer(state = initialState, action: Action): NgrxSoftCacheState {
  return ngrxCacheReducer(state, action);
}