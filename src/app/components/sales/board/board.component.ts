import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/authentication/user.service';
import {User} from '../../../model/models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {
  public users: User[];
  constructor(private userService: UserService) {

  }

  public ngOnInit(): void {

  }
  public ngAfterViewInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {

      this.users = users;
      console.log(this.users);
    });
  }

}
