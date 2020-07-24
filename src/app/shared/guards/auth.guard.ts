import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router, CanActivate } from '@angular/router';
import { Observable, from } from 'rxjs';
import { LoginService } from 'src/app/core/auth/login.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }
  // Proteje la ruta
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.validarUsuario();
  }
  // Proteje el modulo de la ruta
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.validarUsuario();
  }
  validarUsuario() {
    return from(this.loginService.userAuth())
    .pipe(
      map(resp => {
        console.log(resp);
        if (resp === null || resp === undefined) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
