import { Component, Input, OnInit } from '@angular/core';
import { User } from '../common/models/user';
import { UserEmployeeInfo } from '../common/models/user-info';
import { UserService } from '../common/services/user.service';
import * as introJs from 'intro.js/intro.js';
import { Router } from '@angular/router';
import { TaskService } from '../common/services/task.service';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./../app.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Input() user = new User();
  nextTaskText:string;
  nextTaskTime:string;
  topic_id:number;
  salution:string;
  nextTasks:any;
  employee = new UserEmployeeInfo({});
  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private cookie: CookieService,
    public router: Router) { }

  ngOnInit(): void {
    this.userService.getCurrent().subscribe((data:User) => {
      console.log("Updates");
      this.user = data;
      this.employee=new UserEmployeeInfo(this.user.employee);
      this.salution=getSalution();
      
    });
    this.taskService.currentData.subscribe(data => {
      this.nextTasks=data;
      if(this.nextTasks.policy.length>0){
          this.nextTaskText="Sign the Policy Document for the "+this.nextTasks.policy[0].topic_courses.topics.topic_name+" topic.";
          this.nextTaskTime="30 mins";
          this.topic_id=this.nextTasks.policy[0].id;
      }
      else if(this.nextTasks.lms.length>0){
        this.nextTaskText="Complete the Formal Training course for your "+ this.nextTasks.lms[0].topic_courses.topics.topic_name+" topic.";
          this.nextTaskTime=(this.nextTasks.lms[0].topic_courses.courses.course_duration*60)+ " mins";
          this.topic_id=this.nextTasks.lms[0].id;
      }
      else if(this.nextTasks.mm.length>0){
        this.nextTaskText="Complete the Mastery Moment for your "+ this.nextTasks.mm[0].topic_courses.topics.topic_name+" topic.";
          this.nextTaskTime="30 mins";
          this.topic_id=this.nextTasks.mm[0].id;
        
      }
      else if(this.nextTasks.mm_lms.length>0){
        this.nextTaskText="Complete the Mastery Moment for your "+ this.nextTasks.mm_lms[0].topic_courses.topics.topic_name+" topic.";
          this.nextTaskTime="30 mins";
          this.topic_id=this.nextTasks.mm_lms[0].id;
        
      }
    });
  }

  showIntro(){

  var verifyModal = document.getElementById("verifyModal");
  verifyModal.style.display = "none";

    var intro:any = introJs();
    intro.setOptions({
      steps: [
        
        {
          title: 'Status Bar',
          intro: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a.',
          position: 'bottom'        
        },
        {
        element: '.nav-fixed',
        title: 'Status Bar',
        intro: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a.',
        position: 'bottom'        
      },

      {
        element: '.task-container',
        intro: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a.',
        position: 'left'
      },
      
        {
          element: '.all-topics',
          intro: 'TLorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a.',
          position: 'right'
        },
     
        
        {
          element:'.next-task',
          intro: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a.',
          position: 'left'
        },
        
],
      showBullets: true,
      hidePrev: true,
      skipLabel: 'Skip',
      keyboardNavigation: true,
      tooltipClass: 'customTooltip',
    });
    intro.goToStep(2).start();
    intro.onchange(function(targetElement) {  
      console.log(targetElement.getAttribute("data-step")); 

          switch (targetElement.getAttribute("data-step")) 
              { 
              case 1: 
                $(".introjs-tooltip").css("margin-left", "250px");
              break; 
              }
      }).start();
  }

  testFunc() {
    var helpModal = document.getElementById("helpModal");
    
  var helpBtn = document.getElementById("helpBtn");

  var verifyModal = document.getElementById("verifyModal");

  var verifyBtn = document.getElementById("verifyBtn");

      helpModal.style.display = "block";
  
  
      verifyBtn.onclick = function() {
          helpModal.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == helpModal) {
      helpModal.style.display = "none";
    }
  }

  verifyBtn.onclick = function() {
      helpModal.style.display = "none";
      verifyModal.style.display = "block";
  }
  
 
  }

  skipTour(){
    var helpModal = document.getElementById("helpModal");
    helpModal.style.display = "none";
  }

  openTopic(){
    this.router.navigateByUrl(`/my/topics/`+this.topic_id);
  }

  // logout(){
  //   this.cookie.delete('token');
  //   this.router.navigateByUrl(`/login`+this.topic_id);
  // }

}


function getSalution(): string {
  var day = new Date();
  var hr = day.getHours();
  if (hr >= 0 && hr < 12) {
    return "Good Morning";
  } else if (hr == 12) {
    return "Good Afternoon";
  } else if (hr >= 12 && hr <= 17) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }

 
}

