import { createReducer, on, Action } from '@ngrx/store';
import { Producto } from 'src/app/shared/interfaces/producto.interface';
import { pedirSubProductoAction, agregarSubProductoAction, vaciarSubProductoAction } from '../actions/subProducto.actions';

const initialState: { data: Producto[] } = {
    data: [],
};
export const reducer = createReducer(initialState,
    on(pedirSubProductoAction),
    on(agregarSubProductoAction, ((state, productos) => {
        // console.log(state, productos);
        return {
            data: [...productos.data]
        };
    })),
    on(vaciarSubProductoAction, (state, producto) => {
        return { ...initialState };
    })
);
export function subProductoReducer(state: { data: Producto[]}, action: Action) {
    return reducer(state, action);
}
