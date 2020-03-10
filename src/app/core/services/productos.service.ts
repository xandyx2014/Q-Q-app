import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../auth/login.service';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { URL_WEB, PRODUCTO_URL_PAGINATE } from 'src/app/config/variable.config';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private loginService: LoginService,
    private http: HttpClient
  ) { }

  obtenerProducto(url = PRODUCTO_URL_PAGINATE) {
    return from(
      this.loginService.userAuth()
    ).pipe(
      switchMap( usuario => {
        const headers = new HttpHeaders({
          ['Content-Type']: 'application/json',
          ['Authorization']: `Bearer ${usuario[0].token}`
        });
        return this.http.get(`${url}&per_page=20`, { headers });
      })
    );
  }
  obtenerSubProducto( id: string ) {
    return from(
      this.loginService.userAuth()
    ).pipe(
      switchMap( usuario => {
        const headers = new HttpHeaders({
          ['Content-Type']: 'application/json',
          ['Authorization']: `Bearer ${usuario[0].Stoken}`
        });
        return this.http.get(`${URL_WEB}/product/son/${id}`, { headers });
      })
    );
  }
}
