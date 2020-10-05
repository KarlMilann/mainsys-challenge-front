import {Component, Input, OnInit} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {User} from '../../../model/models';
import {UserService} from '../../../services/authentication/user.service';
import {Router} from '@angular/router';
export  interface NonPrezTab {
  label: string;
  routerLink: string;
}
@Component({
  selector: 'app-tab-component',
  templateUrl: './tab-component.component.html',
  styleUrls: ['./tab-component.component.scss']
})
export class TabComponentComponent implements OnInit {

  public asyncTabs: Observable<NonPrezTab[]>;

  constructor(private user: UserService, public router: Router) {

  }

  public ngOnInit(): void {
    this.checkUserRole();
  }

  private checkUserRole(): void {
    this.asyncTabs = new Observable<NonPrezTab[]>((observer: Observer<NonPrezTab[]>) => {
      (this.user.roles.indexOf('ROLE_ADMIN') > -1) ?
        setTimeout(() => {
          observer.next([
            {label: 'My Sales', routerLink: 'my-sales'},
            {label: 'Board', routerLink: 'board'}
          ]);
        }, 1000)
        :
        setTimeout(() => {
          observer.next([
            {label: 'My Sales', routerLink: 'my-sales'},
            {label: 'Board', routerLink: 'board'}
          ]);
        }, 1000)
      ;
    });
  }

}
