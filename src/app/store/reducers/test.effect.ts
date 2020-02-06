import { createReducer, on, Action } from '@ngrx/store';
import { TestAction } from '../actions/test.action';

const initialState: { id: string } = {
    id: null,
};
export const reducer = createReducer(initialState,
    on(TestAction, (state, action) => ({...state, ...action}))
);
export function testReducer(state: { id: string } , action: Action) {
    return reducer(state, action);
}
