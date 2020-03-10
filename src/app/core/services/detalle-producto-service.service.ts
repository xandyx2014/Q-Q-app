import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../auth/login.service';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { URL_WEB } from 'src/app/config/variable.config';
import { DetalleProducto } from 'src/app/shared/interfaces/detailsProducto.interface';

@Injectable({
  providedIn: 'root'
})
export class DetalleProductoServiceService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }
  obtenerDetalleProducto(id) {
    return from(
      this.loginService.userAuth()
    ).pipe(
      switchMap( usuario => {
        const headers = new HttpHeaders({
          ['Content-Type']: 'application/json',
          ['Authorization']: `Bearer ${usuario[0].token}`
        });
        return this.http.get<DetalleProducto[]>(`${URL_WEB}/order/${id}/details`, { headers });
      })
    );
  }
}
