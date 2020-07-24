import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable, from } from 'rxjs';
import { Storage } from '@ionic/storage';
import { TOUR_KEY } from 'src/app/config/variable.config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TourGuard implements CanLoad, CanActivate {
  constructor(
    private storage: Storage,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw this.validarTour();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.validarTour();
  }
  validarTour() {
    return from(this.storage.get(TOUR_KEY)).pipe(
      map( value => {
        // console.log(value);
        if (value === null || typeof value === 'undefined') {
          this.router.navigate(['/tour']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
