import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuth } from 'src/app/shared/interfaces/auth/user.interface';
import { URL_WEB, USER_AUTH } from 'src/app/config/variable.config';
import { flatMap, tap, map, pluck } from 'rxjs/operators';
import { Username } from 'src/app/shared/interfaces/user.interface';
import { StorageService } from '../services/storage.service';
import { InformacionService } from '../services/informacion.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token: string;
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private informacionService: InformacionService,
    private router: Router,
    public loadingController: LoadingController
  ) { }
  async getToken(user: UserAuth) {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.http.post(`${URL_WEB}/auth/login`, { ...user }, { observe: 'response' })
      .pipe(
        flatMap((resp: any) => {
          this.token = resp.body.access_token;
          return this.login(resp.body.access_token);
        }),
      )
      .subscribe(
        async (resp: any) => {
          await loading.dismiss();
          if (resp) {
            await this.storage.guardarDatos({
              dato: {...resp.body, token: this.token},
              referencia: USER_AUTH
            });
            await this.router.navigate(['/home']);
          }
        },
        async (error) => {
          await loading.dismiss();
          if (error) {
            this.informacionService.presentToast('Error al login o Datos Incorrectos');
          }
          console.log(error);
        }
      );
  }
  logout() {
    this.storage.eliminarTodo(USER_AUTH);
  }
  userAuth() {
    return this.storage.obtenerDatos<Username>(USER_AUTH);
  }
  login(token: string) {
    const headers = new HttpHeaders({
      ['Content-Type']: 'application/json',
      ['Authorization']: `Bearer ${token}`
    });
    return this.http.get(`${URL_WEB}/auth/user`, { headers, observe: 'response' })
      .pipe(
        map(resp => {
          if (resp.status !== 200) {
            return null;
          }
          return resp;
        })
      );
  }
}
