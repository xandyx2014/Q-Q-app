import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ProductosService } from 'src/app/core/services/productos.service';
import { pedirSubProductoAction, agregarSubProductoAction } from '../actions/subProducto.actions';
@Injectable()
export class SubProductoEffect {


    medicion$ = createEffect(() => this.actions$.pipe(
        ofType(pedirSubProductoAction),
        switchMap( action => {
            // console.log(action);
            const {id} = action;
            return this.productoService.obtenerSubProducto(id).pipe(
                map((result: any) => {
                    // console.log(result);
                    return agregarSubProductoAction({ data: result.data});
                })
            );
        })
        )
    );


    constructor(
        private actions$: Actions,
        private productoService: ProductosService
    ) { }
}
