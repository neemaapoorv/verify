import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/common/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { AppmainComponent } from './appmain.component';
import { CharterPageComponent } from 'src/app/charter-page/charter-page.component';
import { MessageCenterComponent } from 'src/app/message-center/message-center.component';
import { MasteryMomentComponent } from '../mastery-moment/mastery-moment.component';
import { TopicsComponent } from 'src/app/dashboard/dashboard-topics/topics/topics.component';
import { MyTeamComponent } from 'src/app/my-team/my-team.component';

const routes: Routes = [

  {
    path: 'my',
    canActivate: [AuthGuard],
    component: AppmainComponent,
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'charter',
        component: CharterPageComponent,
      },
      {
        path: 'messageCenter',
        component: MessageCenterComponent,
      },
      {
        path: 'my-team',
        component: MyTeamComponent,
      },
      {
        path: 'masterymoment/:id',
        component: MasteryMomentComponent,
      },
      {
        path: 'topics/:id',
        component: TopicsComponent,
      }
    ]
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppmainRoutingModule {
  static components = [
    DashboardComponent,
  ];
 }
