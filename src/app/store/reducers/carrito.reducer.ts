import { createReducer, on, Action } from '@ngrx/store';
import { Producto } from 'src/app/shared/interfaces/producto.interface';
import {
    SolicitarCarritoAction,
    AgregarCarritoAction,
    EliminarPorIdCarritoAction,
    ActualizarCantidadCarrito,
    EliminarTodosCarritoAction
} from '../actions/carrito.actions';

const initialState: {data: Producto[]} = {
    data: []
};
export const reducer = createReducer(initialState,
    on(SolicitarCarritoAction),
    on(AgregarCarritoAction, (state, action) => {
        console.log(action);
        return {
            data: [ ...state.data, {...action}]
        };
    }),
    on(EliminarPorIdCarritoAction, (state, action) => {
        return {
            data: [...state.data.filter( (item) => item.uid !== action.uid)]
        };
    }),
    on(ActualizarCantidadCarrito, (state, action) => {
        return {
            data: [...state.data.map(
                (item) => {
                    if (item.uid === action.uid) {
                        item.cantidad = action.cantidad;
                    }
                    return {...item};
                }
            )]
        };
    } ),
    on(EliminarTodosCarritoAction, (state, action) => {
        return {...initialState};
    })
);
export function carritoReducer(state: {data: Producto[]} , action: Action) {
    return reducer(state, action);
}
