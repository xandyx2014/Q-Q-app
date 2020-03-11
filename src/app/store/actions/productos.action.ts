import { createAction, props } from '@ngrx/store';
import { RespProductos } from 'src/app/shared/interfaces/producto.interface';
export const pedirProductoAction = createAction(
    '[Producto] Pedir Producto',
    props<{url?: string, q?: string}>()
);
export const agregarProductoAction = createAction(
    '[Producto] agregar Producto',
    props<RespProductos>()
);
export const vaciarProductoAction = createAction(
    '[Producto] vaciar Producto',
);
