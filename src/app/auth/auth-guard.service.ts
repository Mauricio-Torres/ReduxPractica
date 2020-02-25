import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private router: Router, public authService: AuthService) { }
  canLoad() {
    return this.authService.isAuth();
  }

  canActivate() {

    return this.authService.isAuth().pipe( take(1) );
  }
}
