import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/common/services/topic.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard-topics',
  templateUrl: './dashboard-topics.component.html',
  styleUrls: ['../../app.component.css'],
})
export class DashboardTopicsComponent implements OnInit {
  topics = [];
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(public topicService: TopicService, private router: Router) {
    this.chartOptions = {
      series: [
        {
          name: 'Session Duration',
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        // dropShadow: {
        //   enabled: true,
        //   color: '#000',
        //   top: 18,
        //   left: 7,
        //   blur: 10,
        //   opacity: 0.2,
        // },
      },
      
      
      dataLabels: {
        enabled: false,
      },
      
      stroke: {
        width: 5,
        curve: 'straight',
        dashArray: [0],
      },
      title: {
        text: 'Action/Welcome/status title',
        align: 'left',
      },

      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            ' - <strong>' +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            '</strong>'
          );
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        labels: {
          trim: false,
        },
        categories: [
          '01 Jan',
          '02 Jan',
          '03 Jan',
          '04 Jan',
          '05 Jan',
          '06 Jan',
          '07 Jan',
          '08 Jan',
          '09 Jan',
          '10 Jan',
          '11 Jan',
          '12 Jan',
        ],
      },

      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + ' (mins)';
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + ' per session';
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val;
              },
            },
          },
        ],
      },
      grid: {
        borderColor: '#f1f1f1',
      },
    };
  }

  ngOnInit(): void {
    this.topicService.getTopics().subscribe((topics) => {
      this.topics = topics;
    });
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  openMasteryMoment(topic_id: number) {
    this.router.navigateByUrl(`/my/masterymoment/` + topic_id);
  }

  openTopics(id: number) {
    this.router.navigateByUrl(`/my/topics/` + id);
  }

  getPolicyIcon(topic: any) {
    if (
      topic.policy_doc_complete == 'Not Started' ||
      topic.policy_doc_complete == 'In Progress'
    ) {
      return '../assets/images/topic-not-started.svg';
    } else if (topic.policy_doc_complete == 'Complete') {
      //return '../assets/images/warning--glyph-light.svg';
      return '../assets/images/checkmark-icon-green.svg';
    } else {
      return '../assets/images/no-content-topic.svg';
    }
  }

  getTrend(topic: any) {
    if (topic.trend == 1) {
      return '../assets/images/trend-arrow-green.svg';
    } else if (topic.trend == -1) {
      return '../assets/images/trend-arrow-red.svg';
    } else {
      return '../assets/images/trend-arrow-orange.svg';
    }
  }

  getFormalIcon(topic: any) {
    if (
      topic.formal_training_complete == 'Not Started' ||
      topic.formal_training_complete == 'In Progress'
    ) {
      return '../assets/images/topic-not-started.svg';
    } else if (topic.formal_training_complete == 'Complete') {
      //return '../assets/images/warning--glyph-light.svg';
      return '../assets/images/checkmark-icon-green.svg';
    } else {
      return '../assets/images/no-content-topic.svg';
    }
  }
}
