import { createAction, props } from '@ngrx/store';
import { Producto } from 'src/app/shared/interfaces/producto.interface';
export const pedirSubProductoAction = createAction(
    '[SubProducto] Pedir subProducto',
    props<{id: string}>()
);
export const agregarSubProductoAction = createAction(
    '[SubProducto] agregar subProducto',
    props< { data: Producto[] } >()
);
export const vaciarSubProductoAction = createAction(
    '[SubProducto] vaciar subProducto',
);
