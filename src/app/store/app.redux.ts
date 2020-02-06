import { ActionReducerMap } from '@ngrx/store';
import { testReducer } from './reducers/test.effect';


export interface AppState {
    test: { id: string};
}

export const appReducer: ActionReducerMap<AppState> = {
    test: testReducer,
};
