import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_WEB } from 'src/app/config/variable.config';
import { Busqueda } from 'src/app/shared/interfaces/busqueda.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdenServiceService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerOrdenes(id, order?: Busqueda) {
    order = order || {};
    const params = new HttpParams({
      fromObject: {
        ...order
      }
    });
    return this.http.get(`${URL_WEB}/user_app_customer/${id}/orders`, {params});
  }
  realizarOrden(orden) {
    return this.http.post(`${URL_WEB}/order`, {...orden});
  }
}
