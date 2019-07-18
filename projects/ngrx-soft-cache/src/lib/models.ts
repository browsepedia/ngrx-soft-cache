
export interface CachedResponse<T> {
  data: T;
  stale: boolean;
}

export interface CacheRequest {
  url: string;
  method?: 'get' | 'post';
  body?: any;
}