import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HttpClientModule } from "@angular/common/http";
import { HomepageComponent } from './homepage/homepage.component';
import { WelcomepageComponent } from './application/welcomepage/welcomepage.component';
import { NavbarCalendarComponent } from './application/navbar-calendar/navbar-calendar.component';
import { JwtModule } from "@auth0/angular-jwt";
import { GroupComponent } from './group/group.component';
import { CalendarComponent } from './group/calendar/calendar.component';
import { ChatComponent } from './group/chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CalendarCommonModule, CalendarDayModule, CalendarMonthModule, CalendarWeekModule } from 'angular-calendar';
import 'flatpickr/dist/flatpickr.css';
import { MemberManagementComponent } from './group/member-management/member-management.component';


export function tokenGetter() {
    return localStorage.getItem("jwt");
}


@NgModule({
    exports: [CalendarComponent],
    declarations: [
        AppComponent,
        AuthComponent,
        LoginComponent,
        SignUpComponent,
        HomepageComponent,
        WelcomepageComponent,
        NavbarCalendarComponent,
        GroupComponent,
        CalendarComponent,
        ChatComponent,
        MemberManagementComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ["localhost:5501"],
                disallowedRoutes: []
            }
        }),
        CalendarWeekModule,
        CalendarDayModule,
        CalendarMonthModule,
        CalendarCommonModule,
        NgbModalModule,
        CommonModule,
        FlatpickrModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
