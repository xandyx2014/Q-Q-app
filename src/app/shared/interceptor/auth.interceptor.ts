import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { InformacionService } from 'src/app/core/services/informacion.service';
import { ModalController } from '@ionic/angular';
import { ACCESS_TOKEN } from 'src/app/config/variable.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private informacionService: InformacionService,
    private modalCtrl: ModalController,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    // console.log(accessToken, '[Token access]');
    const headers = new HttpHeaders({
      ['Content-Type']: 'application/json',
      ['Authorization']: `Bearer ${accessToken}`
    });
    const duplicate = req.clone({headers});
    return next.handle(duplicate).pipe(
      catchError((error) => {
        // console.log(error);
        this.modalCtrl.dismiss();
        this.router.navigate(['/login']).then( () => {
          this.informacionService.presentToast('Ups Ha ocurrido un Error Inesperado');
        });
        return throwError(error);
      })
    );
  }
}
