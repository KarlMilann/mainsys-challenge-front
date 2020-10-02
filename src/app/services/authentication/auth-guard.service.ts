import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
/**
 * this class is used to check if the user is an admin
 */
export class AuthGuardService implements CanActivate {
  private isLoggedIn: boolean;
  private roles: string[];

  constructor(private router: Router, private tokenStorage: TokenStorageService) {
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenStorage.getToken() && this.tokenStorage.getAuthorities().indexOf('ROLE_ADMIN') > -1) {
      return true;
    }
    // navigate to login page
    this.router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
