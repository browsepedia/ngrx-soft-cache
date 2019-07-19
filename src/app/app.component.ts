import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './reducers';

import * as fromCache from 'ngrx-soft-cache';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngrx-soft-cache-project';

  constructor(private store: Store<State>) {
    this.store.dispatch(fromCache.LoadCachedOrFetch({
      urls: [
        { url: 'http://dummy.restapiexample.com/api/v1/employees' },
        { url: 'http://dummy.restapiexample.com/api/v1/employee/22435' },
      ]
    }));

    this.store.select(fromCache.selectFromCache, { url: 'http://dummy.restapiexample.com/api/v1/employees' }).subscribe((data) => console.log(data));
    this.store.select(fromCache.selectMultipleFromCache, {
      urls: [
        'http://dummy.restapiexample.com/api/v1/employees',
        'http://dummy.restapiexample.com/api/v1/employee/22435'
      ]
    }).subscribe(console.log)
  }
}
