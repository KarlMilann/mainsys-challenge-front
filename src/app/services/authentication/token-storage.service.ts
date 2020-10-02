import {Injectable} from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
/**
 * management of the user connection

 * this class is used to stay logged in if you've closed your browser without disconnection,
 * it is also used to manage the login and registering.
 */
export class TokenStorageService {
  private roles: Array<string> = [];

  constructor() {
  }

  /**
   * disconnect the user and clear all info stored in local storage
   */
  public signOut() {
    window.localStorage.clear();
  }

  /**
   * save the user into local storage
   * @param token
   */

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * get the user info stored in the local storage
   */

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * save the username to the localStorage
   * @param username
   */

  public saveUsername(username: string) {
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return localStorage.getItem(USERNAME_KEY);
  }

  /**
   * save the role of the user into localstorage
   * @param authorities
   */
  public saveAuthorities(authorities: string[]) {
    window.localStorage.removeItem(AUTHORITIES_KEY);
    window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  /**
   * this method return the roles set for the user (ADMIN / USER) there is already a third role in the database
   * if there is a need of a sub admin (like an editor) you can use it (got to the server side in RoleName enum)
   */
  public getAuthorities(): string[] {
    this.roles = [];

    if (localStorage.getItem(TOKEN_KEY)) {
      JSON.parse(localStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }
}
