import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from './authentication/token-storage.service';

@Injectable({
  providedIn: 'root'
})

/**
 * management between server and client for User Object

 * All those methods are the links between the client and each API.
 * If you want to see how they are managed, go to the server side and look for the url entered.
 * example: for getUserByName(username: string),
 * go to UserController in the server side and seek the Get method launched by /users/{username}.
 */

export class SalesService {

  private baseUrl = `${environment.api}/sales`;

  constructor() {

  }
}
