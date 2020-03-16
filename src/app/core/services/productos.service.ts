import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginService } from '../auth/login.service';
import { from } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { URL_WEB, PRODUCTO_URL_PAGINATE } from 'src/app/config/variable.config';
import { StorageService } from './storage.service';
import { Network } from '@ionic-native/network/ngx';
import { IsOnlineService } from './is-online.service';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private storageService: StorageService,
    private isOnlineService: IsOnlineService
  ) {
  }

  obtenerProducto(url = PRODUCTO_URL_PAGINATE, q = '') {
    return from(
      this.loginService.userAuth()
    ).pipe(
      switchMap( usuario => {
        const headers = new HttpHeaders({
          ['Content-Type']: 'application/json',
          ['Authorization']: `Bearer ${usuario[0].token}`
        });
        const params = new HttpParams({
          fromObject: {
            q
          }
        });
        if (navigator.onLine) {
          return this.http.get(`${url}&per_page=20`, { headers, params }).pipe(
            tap( (res: any) => {
              this.storageService.guardarDatos({
                referencia: url,
                dato: res
              });
            })
          );
        }
        return from(this.storageService.obtenerDatos(url)).pipe(
          map( resp => {
            if (resp === null) {
              console.log('entre', resp);
              return {
                data: [],
                meta: {
                  paginator: {
                    links: {
                      next: 'undefined'
                    }
                  }
                }
              };
            } else {
              return resp;
            }
          }),
          map( resp =>  resp[0])
        );
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
        if (navigator.onLine) {
          console.log('online');
          return this.http.get(`${URL_WEB}/product/son/${id}`, { headers })
            .pipe(
              tap( resp => {
                console.log('resp storage', id , resp);
                this.storageService.guardarDatos({
                  referencia: id,
                  dato: resp
                });
              })
            );
        }
        return from(this.storageService.obtenerDatos(id)).pipe(
          map(resp => {
            if (resp === null || typeof resp === 'undefined') {
              console.log('hola', resp);
              return [{
                data: []
              }];
            } else {
              return resp;
            }
          }),
          map( resp => resp[0]),
          tap( resp => console.log(resp)),
        );
      })
    );
  }
}
