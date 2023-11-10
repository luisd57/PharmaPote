import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAdmin().pipe(
      map(isAdmin => {
        if (isAdmin) {
          return true;
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      })
    );
  }
}