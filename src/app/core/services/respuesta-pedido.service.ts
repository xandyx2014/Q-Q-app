import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_WEB } from 'src/app/config/variable.config';

@Injectable({
  providedIn: 'root'
})
export class RespuestaPedidoService {

  constructor(
    private http: HttpClient
  ) { }

  enviar(dato) {
    return this.http.post(`${URL_WEB}/order/finish`, {...dato});

  }
}
