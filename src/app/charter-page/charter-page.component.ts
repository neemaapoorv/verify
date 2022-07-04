import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Charter } from '../common/models/charter';
import { User } from '../common/models/user';
import { UserCharter } from '../common/models/user-charter';
import { CharterService } from '../common/services/charter.service';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-charter-page',
  templateUrl: './charter-page.component.html',
  styleUrls: ['./../app.component.css']
})
export class CharterPageComponent implements OnInit {

  constructor(
    public charterService:CharterService,
    private sanitizer: DomSanitizer,
    public userService:UserService,
    public router: Router
    ) { }
  charter:Charter;
  charter_date:string="";
  html:SafeHtml;
  agree: boolean = false;
  user:User;
  signed:boolean=false;
  ngOnInit(): void {

    this.userService.getCurrent().subscribe((data:User) => {
      this.user=data;
      if(this.user.charter && this.user.charter.status=="Y"){
        this.signed=true;
      }
    });
    this.charterService.getCharter().subscribe(charter => {
      this.charter=charter;
      this.html = this.sanitizer.bypassSecurityTrustHtml(charter.data);
    });
    
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
    var scrolledY = window.scrollY;

    if(scrolledY){
      window.scroll(0, scrolledY - 280);
    }
  }

  markComplete(){
    this.charterService.markCharterComplete(this.charter.id).subscribe(data => {
      this.charter_date=data.updated_at;
      this.signed=true;
      this.userService.clearCache();
      this.reloadCurrentRoute();
    });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
