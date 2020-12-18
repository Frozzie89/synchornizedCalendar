import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../common/user/user-session.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    constructor(private userSession: UserSessionService, private router: Router) { }
    ngOnInit() {
        this.userSession.setUserToken();
        if (this.userSession.user != null)
            this.router.navigate(["/group"]);

    }


}
