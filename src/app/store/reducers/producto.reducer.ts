import { createReducer, on, Action } from '@ngrx/store';
import { pedirProductoAction, agregarProductoAction, vaciarProductoAction } from '../actions/productos.action';
import { RespProductos } from 'src/app/shared/interfaces/producto.interface';

const initialState: RespProductos = {
    data: null,
    meta: null
};
export const reducer = createReducer(initialState,
    on(pedirProductoAction),
    on(agregarProductoAction, ( (state, productos) => {
        // console.log(state, productos);
        if (state.data === null) {
            return {
                ...productos
            };
        }
        return {
            ...productos,
            data: [
                ...state.data,
                ...productos.data
            ],
            meta: {...productos.meta}
        };
    })),
    on(vaciarProductoAction, (state, producto) => {
        return {...initialState};
    })
);
export function productoReducer(state: RespProductos , action: Action) {
    return reducer(state, action);
}
