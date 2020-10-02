import { Component, OnInit } from '@angular/core';
import {SignUpInfo} from '../../../model/authentication/signup-info';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: any = {};
  public signupInfo: SignUpInfo;
  public isSignedUp = false;
  public isSignUpFailed = false;
  public errorMessage = '';
  constructor(private authService: AuthService, private router: Router) { }

  public ngOnInit(): void {

  }
  public onSubmit(): void {
    this.signupInfo = new SignUpInfo(
      this.form.username,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.router.navigateByUrl('/login');
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
