import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Invitations } from 'src/app/common/invitation/invitation';
import { InvitationApiService } from 'src/app/common/invitation/invitation-api.service';
import { UserSessionService } from 'src/app/common/user/user-session.service';
import { CommonModule } from '@angular/common';
import { PlanningApiService } from 'src/app/common/planning/planning-api.service';
import { Plannings } from 'src/app/common/planning/planning';
import { MemberApiService } from 'src/app/common/member/member-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-navbar-calendar',
    templateUrl: './navbar-calendar.component.html',
    styleUrls: ['./navbar-calendar.component.css']
})

export class NavbarCalendarComponent implements OnInit, OnDestroy {

    formInviteUser: FormGroup = this.fb.group({
        userEmail: ['', Validators.required],
        idPlanning: ['', Validators.required]
    });

    invitations: Invitations = [];
    planningsInvites: Plannings = [];
    planningsOfMember: Plannings = [];

    private subscriptions: Subscription[] = [];


    constructor(
        private invitationsModal: NgbModal,
        private router: Router,
        private userSessionService: UserSessionService,
        private planningApi: PlanningApiService,
        private invitationApi: InvitationApiService,
        private memberApi: MemberApiService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.userSessionService.setUserToken();
        this.getInvitations();
        this.getPlanningsOfMember();

    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(element => {
            element.unsubscribe()
        });
    }

    openModal(content) {
        this.invitationsModal.open(content, { ariaLabelledBy: 'Invitations reçues' })
    }

    getInvitations() {
        this.subscriptions.push(
            this.invitationApi.queryFromUserRecever(this.userSessionService.user.idUser)
                .subscribe(
                    invitations => {
                        this.invitations = invitations;
                        this.invitations.forEach(element => {
                            this.getPlanningById(element.idPlanning, this.planningsInvites);
                        });
                    })
        )
    }

    getPlanningsOfMember() {
        this.subscriptions.push(
            this.memberApi.queryFromUser(this.userSessionService.user.idUser)
                .subscribe(
                    members => {
                        members.forEach(element => {
                            this.getPlanningById(element.idPlanning, this.planningsOfMember);
                        });
                        this.getPlanningBySuperUser(this.userSessionService.user.idUser, this.planningsOfMember);
                    }
                )
        )
    }

    getPlanningById(idPlanning: number, plannings: Plannings) {
        this.subscriptions.push(
            this.planningApi.getById(idPlanning)
                .subscribe(
                    planning => { plannings.push(planning); })
        )
    }

    getPlanningBySuperUser(idUser: number, plannings: Plannings) {
        this.subscriptions.push(
            this.planningApi.getBySuperUserId(idUser)
                .subscribe(
                    planning => { plannings.push(planning); })
        )
    }

    InviteUser() {

    }

    logOut() {
        localStorage.removeItem("jwt");
        this.router.navigate(['/home']);
    }

}
