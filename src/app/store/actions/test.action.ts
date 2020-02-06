import { createAction, props } from '@ngrx/store';
export const TestAction = createAction(
    '[Test] Peticion a la Test',
    props<{id: string}>()
);
