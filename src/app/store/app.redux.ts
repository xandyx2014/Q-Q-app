import { ActionReducerMap } from '@ngrx/store';
import { testReducer } from './reducers/test.effect';
import { RespProductos, Producto } from '../shared/interfaces/producto.interface';
import { productoReducer } from './reducers/producto.reducer';
import { carritoReducer } from './reducers/carrito.reducer';
import { subProductoReducer } from './reducers/subProducto.reducer';


export interface AppState {
    test: { id: string};
    productos: RespProductos;
    subProductos: { data: Producto[]};
    carrito: {data: Producto[] };
}

export const appReducer: ActionReducerMap<AppState> = {
    test: testReducer,
    productos: productoReducer,
    subProductos: subProductoReducer,
    carrito: carritoReducer
};
