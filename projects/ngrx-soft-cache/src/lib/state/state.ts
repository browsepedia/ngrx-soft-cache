import { CachedResponse } from '../models';

export interface NgrxSoftCacheState { [key: string]: CachedResponse<any> };
