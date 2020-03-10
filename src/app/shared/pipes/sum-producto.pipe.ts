import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import * as sumby from 'lodash.sumby';
@Pipe({
  name: 'sumProducto'
})
export class SumProductoPipe implements PipeTransform {

  transform(value: Producto[]) {
    // let valorTotal = 0;
    const valores = value.map( (item) => {
      return {
        total: item.cantidad * item.price_sale
      };
    });
    return sumby(valores, 'total');
    // return  valores.filter( (item) => item.total + item.total );
  }

}
