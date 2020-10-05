import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/models';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
/**
 * managament between server and client for User Object

 * All those methods are the links between the client and each API.
 * If you want to see how they are managed, go to the server side and look for the url entered.
 * example: for getUserByName(username: string),
 * go to UserController in the server side and seek the Get method launched by /users/{username}.
 */


export class UserService {

  public isLoggedIn = false;
  public roles: string[] = [];
  public id: number;
  private baseUrl = `${environment.api}/users`;

  constructor(private tokenStorage: TokenStorageService, private http: HttpClient) {
    this.isLoggedIn = !!tokenStorage.getToken();
    this.roles = tokenStorage.getAuthorities();
  }

  public getUsers(): Observable<Object> {
    return this.http.get(`${this.baseUrl}`);
  }

  public getUserByName(username: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${username}`, httpOptions);
  }

  public deleteUser(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }


  public getUsersByRole(role: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/role/${role}`, httpOptions);
  }
}
