import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CalendarComponent } from './group/calendar/calendar.component';
import { GroupComponent } from './group/group.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path: "signup", component: SignUpComponent
    },
    {
        path: "home", component: HomepageComponent
    },
    {
        path: "login", component: LoginComponent
    },
    {
        path: "group", component: GroupComponent, canActivate: [AuthGuardService]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    static component = [LoginComponent, SignUpComponent, HomepageComponent, CalendarComponent];
}
