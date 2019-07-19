# Ngrx Soft Cache 

Frontend soft caching mechanism to cache requests in the ngrx state.

## Install
```cmd
  npm install --save ngrx-soft-cache
```

### Peer dependencies which you must install
```cmd
  npm i --save @ngrx/store@^8.0.0 @ngrx/effects@^8.0.0
```
### In your app.module.ts
```ts
  import { NgrxSoftCacheModule } from 'ngrx-soft-cache';

  // ...
  imports: [
    // ...
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
     NgrxSoftCacheModule
  ]
```

## Usage
```ts
import * as fromCache from 'ngrx-soft-cache';

// ...
constructor(private store: Store<State>){
  // ...
  
  // Does the api calls (GET Requests) and stores the data in the cache.
  // If the any of the requests exists in the cache and are not stale then the cached
  // values are returned. The ones that are in the cached and are stale or are not
  // present in the cache are retrieved from the url.
  this.store.dispatch(fromCache.LoadCachedOrFetch({
      urls: [
        { url: 'http://dummy.restapiexample.com/api/v1/employees' },
        { url: 'http://dummy.restapiexample.com/api/v1/employee/24975' },
      ]
    }));
   
   this.cached = this.store.select(fromCache.selectMultipleFromCache, {
      urls: [
        'http://dummy.restapiexampleasdasd.com/api/v1/employees',
        'http://dummy.restapiexample.com/api/v1/employee/24975'
      ]
    });
  }
```

The ```ts selectMultipleFromCache``` selector returns an object containing the data in key/value pairs,
where the key is the url and the value is the value stored or retrieved in the cache. Besides the data it
also contains a ```ts stale``` property which is ```ts true ``` if any data set in the returned data is stale.

### Example selectMultipleFromCache data
```ts 
  'http://dummy.restapiexample.com/api/v1/employee/22435': [] // data
  'http://dummy.restapiexample.com/api/v1/employees': [] // data
   stale: false // whather any of the 2 returned data sets is stale.
```
If a key is not found the null is returned for that url in the object and the ```ts stale ``` property
is returned as ```ts true ```.

You can also do a POST request and store the data (GET is the default)
```ts
  this.store.dispatch(fromCache.LoadCachedOrFetch({
    urls: [
      { url: myUrl, method: 'post', body: myBody }
    ]
  }));
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
