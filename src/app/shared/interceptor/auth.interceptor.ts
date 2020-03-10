import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { InformacionService } from 'src/app/core/services/informacion.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private informacionService: InformacionService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const duplicate = req.clone();
    return next.handle(duplicate).pipe(
      catchError((error) => {
        console.log(error);
        this.router.navigate(['/login']).then( () => {
          this.informacionService.presentToast('Ups Ha ocurrido un Error Inesperado');
        });
        return throwError(error);
      })
    );
  }
}
