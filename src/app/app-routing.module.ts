import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    static component = [LoginComponent, SignUpComponent, HomepageComponent];
}
