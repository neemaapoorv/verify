import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/common/models/user';
import { TaskService } from 'src/app/common/services/task.service';

@Component({
  selector: 'app-dashboard-tasks',
  templateUrl: './dashboard-tasks.component.html',
  styleUrls: ['../../app.component.css']
})
export class DashboardTasksComponent implements OnInit {

  policy=[];
  lms=[];
  mm_lms=[];
  mm=[];
  constructor(
    private taskService: TaskService,
  ) { }

  @Input() user = new User();
  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.policy = tasks.policy;
      this.lms=tasks.lms;
      this.mm=tasks.mm;
      this.mm_lms=tasks.mm_lms;
      this.taskService.setData(tasks);
    });
    
  }

}
