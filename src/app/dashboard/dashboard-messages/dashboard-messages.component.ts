import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/models/user';
import { UserEmployeeInfo } from 'src/app/common/models/user-info';
import { MessageService } from 'src/app/common/services/message.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-dashboard-messages',
  templateUrl: './dashboard-messages.component.html',
  styleUrls: ['./dashboard-messages.component.css']
})
export class DashboardMessagesComponent implements OnInit {
  first_name="";
  constructor(public userService:UserService, public messageService:MessageService) { }
  user:User = new User();
  messageText="";
  ngOnInit(): void {
    
    

    this.userService.getCurrent().subscribe(user => {
      this.user=user;
      this.first_name=user.employee.first_name;
    });
    this.messageService.getMessages().subscribe(message => {
      
      this.messageText=message.message_text;
    });
  }

}
