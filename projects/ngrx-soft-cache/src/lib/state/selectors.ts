import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NgrxSoftCacheState } from './state';

export const featureSelector = createFeatureSelector('ngrxSoftCache');

export const selectMultipleFromCache = createSelector(
  featureSelector,
  (state: NgrxSoftCacheState, { urls }: { urls: Array<string> }) => {
    const result: any = {};
    let stale = false;
    urls.map((url: string) => {
      const cached = state[url];
      result[url] = !!cached ? cached.data : null;
      stale = stale || (cached && cached.stale) || !cached;
    });

    return { ...result, stale };
  });

export const selectFromCache = createSelector(
  featureSelector,
  (state: NgrxSoftCacheState, { url }: { url: string }) => state[url] ? state[url] : null
);