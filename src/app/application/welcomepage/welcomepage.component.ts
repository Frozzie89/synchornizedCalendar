import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/common/user/user-session.service';

@Component({
    selector: 'app-welcomepage',
    templateUrl: './welcomepage.component.html',
    styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
