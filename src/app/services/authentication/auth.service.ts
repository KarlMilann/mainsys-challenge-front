import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {SignUpInfo} from '../../model/authentication/signup-info';
import {JwtResponse} from '../../model/authentication/jwt-response';
import {AuthLoginInfo} from '../../model/authentication/login-info';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type'
    }
    )
};
@Injectable({
  providedIn: 'root'
})
/**
 * this class is used to managed the user creation if you are in register page or in the user management of the admin section.
 * it is also used to login to your account
 */
export class AuthService {
  private loginUrl = `${environment.api}/auth/signin`;
  private signupUrl = `${environment.api}/auth/signup`;

  constructor(private http: HttpClient) {
  }
  /**
   * login management
   * @param credentials
   */
  public attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {

    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }


  /**
   * create a new normal user
   * @param info
   */
  public signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  /**
   * create a new admin user
   * @param info
   */
  public signUpAdmin(info: SignUpInfo): Observable<any> {
    return this.http.post<string>(`${this.signupUrl}/admin`, info, httpOptions);
  }
}
