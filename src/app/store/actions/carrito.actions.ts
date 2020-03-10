import { createAction, props } from '@ngrx/store';
import { Producto } from 'src/app/shared/interfaces/producto.interface';
export const SolicitarCarritoAction = createAction(
    '[Carrito] Solicita informacion del carrito',
);
export const AgregarCarritoAction = createAction(
    '[Carrito] Agrega informacion del carrito',
    props<Producto>()
);
export const EliminarPorIdCarritoAction = createAction(
    '[Carrito] Elimina un item de un carrito por id',
    props<{uid: string}>()
);
export const ActualizarCantidadCarrito = createAction(
    '[Carrito] Actualizar cantidad del producto del carrito',
    props<{uid: string; cantidad: number}>()
);
export const EliminarTodosCarritoAction = createAction(
    '[Carrito] Elimina toda la Infomracion del carrito'
);
