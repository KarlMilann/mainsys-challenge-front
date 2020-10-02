import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/authentication/auth.service';
import {TokenStorageService} from '../../../services/authentication/token-storage.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/authentication/user.service';
import {AuthLoginInfo} from '../../../model/authentication/login-info';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoggedIn = false;
  public isLoginFailed = false;
  public errorMessage = '';
  public roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  public form: any = {};
  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private user: UserService) { }

  public ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  public onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();

        this.user.isLoggedIn = true;
        this.user.roles = this.tokenStorage.getAuthorities();

        this.router.navigateByUrl('my-sales');
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
