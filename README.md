# Ngrx Soft Cache 

Frontend soft caching mechanism to cache requests in the ngrx state.

## Install
```cmd
  npm install --save ngrx-soft-cache
```

## Usage
```ts
import * as fromCache from 'ngrx-soft-cache';

// ...
constructor(private store: Store<State>){
  // ...
  
  // Does the api calls (GET Requests) and stores the data in the cache.
  this.store.dispatch(fromCache.LoadCachedOrFetch({
      urls: [
        { url: 'http://dummy.restapiexample.com/api/v1/employees' },
        { url: 'http://dummy.restapiexample.com/api/v1/employee/22435' },
      ]
    }));
   
   this.cached = this.store.select(fromCache.selectMultipleFromCache, {
      urls: [
        'http://dummy.restapiexampleasdasd.com/api/v1/employees',
        'http://dummy.restapiexample.com/api/v1/employee/22435'
      ]
    });
  }
```

## Mark as stale
```ts
  this.store.dispatch(fromCache.MarkAsStale({ url: 'http://dummy.restapiexample.com/api/v1/employees' });
```

## Store data direcly without doing a HTTP call
```ts
  this.store.dispatch(fromCache.SetItem({ key: 'hello', data: 'world' });
  // to remove
  this.store.dispatch(fromCache.RemoveItem({ key: 'hello' }));
 ```
