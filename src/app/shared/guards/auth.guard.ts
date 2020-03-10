import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { LoginService } from 'src/app/core/auth/login.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return from(this.loginService.userAuth())
      .pipe(
        map( resp => {
          if (resp === null || resp === undefined) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        })
      );
  }
}
