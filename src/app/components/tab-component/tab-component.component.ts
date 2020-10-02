import {Component, Input, OnInit} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {User} from '../../model/models';
import {UserService} from '../../services/authentication/user.service';
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

  constructor(private user: UserService) {
    this.asyncTabs = new Observable<NonPrezTab[]>((observer: Observer<NonPrezTab[]>) => {
      user.roles.indexOf('ROLE_ADMIN') ?
      setTimeout(() => {
        observer.next([
          {label: 'My Sales', routerLink: 'my-sales'},
          {label: 'Sales Board', routerLink: 'board'},
          {label: 'Admin', routerLink: ''}
        ]);
      }, 1000)
        :
        setTimeout(() => {
          observer.next([
            {label: 'My Sales', routerLink: 'my-sales'},
            {label: 'Sales Board', routerLink: 'board'}
          ]);
        }, 1000)
      ;
    });

  }

  public ngOnInit(): void {
  }

}
