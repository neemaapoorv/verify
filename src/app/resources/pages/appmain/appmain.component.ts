import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from 'src/app/common/models/user';
import { UserEmployeeInfo } from 'src/app/common/models/user-info';
import { UserService } from 'src/app/common/services/user.service';


@Component({
  selector: 'app-appmain',
  templateUrl: './appmain.component.html',
  styleUrls: ['./appmain.component.css']
})
export class AppmainComponent implements OnInit {
  collapsed = true;

  user= new User();
  employee = new UserEmployeeInfo({});
  constructor(
    private userService: UserService) { }
  ngOnInit(): void {
  }




}
