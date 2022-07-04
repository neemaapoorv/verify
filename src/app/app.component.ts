import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './common/models/user';
import { UserService } from './common/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: null | User;
  constructor(
    private router: Router,
    public userService: UserService,
  ) {
  }
  
  ngOnInit() {
    this.userService.subject.subscribe(user => {
      if (this.user && !user) { // logout event occured
        this.router.navigateByUrl('/login');
      }
      this.user = user;
    });

  }
}


