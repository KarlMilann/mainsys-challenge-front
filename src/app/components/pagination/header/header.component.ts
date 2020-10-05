import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TokenStorageService} from '../../../services/authentication/token-storage.service';
import {UserService} from '../../../services/authentication/user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currentUrl: string;
  public showTabs: boolean;
  private isLoggedIn: boolean;
  private roles: string[];
  constructor(location: Location
              , router: Router
              , private tokenStorage: TokenStorageService
              , private user: UserService
              , private route: ActivatedRoute) {

    this.route.paramMap.subscribe((value: ParamMap) => {
      this.ngOnInit();
    });
  }


  public ngOnInit(): void {
    if (this.user.isLoggedIn) {

      this.showTabs = true;
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();

    }

  }
  public signOut(): void {
    this.user.isLoggedIn = false;
    this.showTabs = false;
    this.tokenStorage.signOut();
    window.location.replace('/login');
  }

}
