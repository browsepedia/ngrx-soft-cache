import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/reducer';
import { EffectsModule } from '@ngrx/effects';
import { NgrxSoftCacheEffects } from './state/effects';
import { NgrxSoftCacheService } from './service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    StoreModule.forFeature('ngrxSoftCache', reducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([NgrxSoftCacheEffects]),
    HttpClientModule
  ],
  providers: [NgrxSoftCacheService]
})
export class NgrxSoftCacheModule { }
