import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/common/services/topic.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-dashboard-topics',
  templateUrl: './dashboard-topics.component.html',
  styleUrls: ['../../app.component.css']
})
export class DashboardTopicsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  topics=[];
  constructor(
    public topicService:TopicService,
    private router: Router,
    
  ) {
    this.chartOptions = {
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }

  public generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  ngOnInit(): void {
    this.topicService.getTopics().subscribe(topics => {
      this.topics=topics;

      
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
