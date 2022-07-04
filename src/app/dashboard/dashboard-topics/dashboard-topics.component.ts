import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/common/services/topic.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard-topics',
  templateUrl: './dashboard-topics.component.html',
  styleUrls: ['../../app.component.css']
})
export class DashboardTopicsComponent implements OnInit {
  topics=[];
  constructor(
    public topicService:TopicService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.topicService.getTopics().subscribe(topics => {
      this.topics=topics;
    });
   
  }
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'line',
      data: {
          datasets: [{
              label: 'Current Value',
              data: [0, 20, 40, 50],
              backgroundColor: "rgb(115 185 243 / 65%)",
              borderColor: "#007ee7",
              fill: true,
          },
          {
            label: 'Invested Amount',
            data: [0, 20, 40, 60, 80],
            backgroundColor: "#47a0e8",
            borderColor: "#007ee7",
            fill: true,
        }],
          labels: ['January 2019', 'February 2019', 'March 2019', 'April 2019']
      },
  });
  }

  

  goToLink(url: string){
    window.open(url, "_blank");
  }

  openMasteryMoment(topic_id:number){
    this.router.navigateByUrl(`/my/masterymoment/`+topic_id);
  }

  openTopics(id:number){
    this.router.navigateByUrl(`/my/topics/`+id);
  }

  getPolicyIcon(topic:any){
    if(topic.policy_doc_complete=='Not Started'||topic.policy_doc_complete=='In Progress'){
      return '../assets/images/topic-not-started.svg';
    }
    else if(topic.policy_doc_complete=='Complete'){
      //return '../assets/images/warning--glyph-light.svg';
       return '../assets/images/checkmark-icon-green.svg';
    }
    else{
      return '../assets/images/no-content-topic.svg';
    }
  }

  getTrend(topic:any){
    if(topic.trend==1){
      return '../assets/images/trend-arrow-green.svg';
    }
    else if(topic.trend==-1){
      return '../assets/images/trend-arrow-red.svg';
    }
    else {
      return '../assets/images/trend-arrow-orange.svg';
    }
    
  }

  getFormalIcon(topic:any){
    if(topic.formal_training_complete=='Not Started'||topic.formal_training_complete=='In Progress' ){
      return '../assets/images/topic-not-started.svg';
    }
    else if(topic.formal_training_complete=='Complete'){
      //return '../assets/images/warning--glyph-light.svg';
      return '../assets/images/checkmark-icon-green.svg';
    }
    else{
      return '../assets/images/no-content-topic.svg';
    }
  }

}
