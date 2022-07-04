import { Component, OnInit } from '@angular/core';
import { User } from '../common/models/user';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./../app.component.css']
})
export class DashboardComponent implements OnInit {

  user:User;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getCurrent().subscribe((data:User) => {
      this.user = data;
    });
  }

  

}
