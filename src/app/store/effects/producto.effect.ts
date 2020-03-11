import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { pedirProductoAction, agregarProductoAction } from '../actions/productos.action';
import { ProductosService } from 'src/app/core/services/productos.service';
@Injectable()
export class ProductoEffect {


    medicion$ = createEffect(() => this.actions$.pipe(
        ofType(pedirProductoAction),
        switchMap( action => {
            const {url} = action;
            const { q } = action;
            return this.productoService.obtenerProducto(url, q).pipe(
                map((result: any) => {
                    return agregarProductoAction({...result});
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
