import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardTopicsComponent } from './dashboard/dashboard-topics/dashboard-topics.component';
import { DashboardTasksComponent } from './dashboard/dashboard-tasks/dashboard-tasks.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './resources/pages/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptorInterceptor } from './common/misc/token-interceptor.interceptor';
import { UserService } from './common/services/user.service';
import { AppmainComponent } from './resources/pages/appmain/appmain.component';
import { AppmainRoutingModule } from './resources/pages/appmain/appmain-routing.module';
import { DashboardMessagesComponent } from './dashboard/dashboard-messages/dashboard-messages.component';
import { CharterPageComponent } from './charter-page/charter-page.component';
import { MessageCenterComponent } from './message-center/message-center.component';
import { FormsModule } from '@angular/forms';
import { MasteryMomentComponent } from './resources/pages/mastery-moment/mastery-moment.component';
import { TopicsComponent } from './dashboard/dashboard-topics/topics/topics.component';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { AngularSvgIconModule } from "angular-svg-icon";
import { TaskService } from './common/services/task.service';
import { MyTeamComponent } from './my-team/my-team.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    DashboardTopicsComponent,
    DashboardTasksComponent,
    FooterComponent,
    LoginComponent,
    AppmainComponent,
    AppmainRoutingModule.components,
    DashboardMessagesComponent,
    CharterPageComponent,
    MessageCenterComponent,
    MasteryMomentComponent,
    TopicsComponent,
    MyTeamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppmainRoutingModule,
    FormsModule,
    AccordionModule,
    AngularSvgIconModule.forRoot(),
  ],
  providers: [
    CookieService,
    UserService,
    TaskService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true,
      deps: [
        CookieService,
        UserService,
      ]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
