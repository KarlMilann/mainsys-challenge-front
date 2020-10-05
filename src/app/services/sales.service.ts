import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from './authentication/token-storage.service';
import {Observable} from 'rxjs';
import {Sale} from '../model/models';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
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
  public saleToEdit: Sale;
  private baseUrl = `${environment.api}/sales`;

  constructor(private http: HttpClient) {

  }

  public getSalesForUser(userId: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }
  public getSalesByDate(date: Date): Observable<Object> {
    return this.http.get(`${this.baseUrl}/year/${date}`);
  }
  public createSale(sale: Sale): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, sale, httpOptions);
  }
  public deleteSale(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }
  public updateSale(sale: Sale): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update`, sale);
  }
}
