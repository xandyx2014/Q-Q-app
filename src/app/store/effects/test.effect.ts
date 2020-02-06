import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { TestAction } from '../actions/test.action';
import { mergeMap, map, switchMap } from 'rxjs/operators';
@Injectable()
export class TestEffect {
    medicion$ = createEffect( () => this.actions$.pipe(
        ofType(TestAction),
      ), { resubscribeOnError: false });
      constructor(
        private actions$: Actions
      ) {}
}
