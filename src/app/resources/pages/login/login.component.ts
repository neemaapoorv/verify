import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/common/models/user';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router,
   ) { }

   user:User;
  ngOnInit(): void {
    console.log('Token:'+this.cookieService.get("token"));
    if(this.cookieService.get("token")){
      
      this.cookieService.set("token",this.cookieService.get("token"));
      this.userService.getCurrent().subscribe((data:User) => {
        this.user = data;
        if(this.user.charter && this.user.charter.status=='Y'){
          this.router.navigateByUrl(`/my/dashboard`);
        }
        else{
          this.router.navigateByUrl(`/my/charter`);
        }
      });


      
    }
  }

  login(){
    this.userService.getCurrent().subscribe(r=>{});
  }
}
