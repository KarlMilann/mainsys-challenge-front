import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
/**
 * this class manage the authentication of a user and protect the user infos if he is connected
 */
export class AuthLoginGuardService implements CanActivate {

  constructor(private router: Router, private tokenStorage: TokenStorageService) {
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenStorage.getToken()) {
      return true;
    }
    // navigate to login page
    this.router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
