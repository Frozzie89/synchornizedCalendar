import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Invitation, Invitations } from 'src/app/common/invitation/invitation';
import { InvitationApiService } from 'src/app/common/invitation/invitation-api.service';
import { UserSessionService } from 'src/app/common/user/user-session.service';
import { CommonModule } from '@angular/common';
import { PlanningApiService } from 'src/app/common/planning/planning-api.service';
import { Planning, Plannings } from 'src/app/common/planning/planning';
import { MemberApiService } from 'src/app/common/member/member-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from 'src/app/common/user/user-api.service';
import { User, Users } from 'src/app/common/user/user';
import { Member } from 'src/app/common/member/member';

@Component({
    selector: 'app-navbar-calendar',
    templateUrl: './navbar-calendar.component.html',
    styleUrls: ['./navbar-calendar.component.css']
})

export class NavbarCalendarComponent implements OnInit, OnDestroy {

    formInviteUser: FormGroup = this.fb.group({
        userEmailInvite: ['', Validators.required],
        idPlanningInvite: ['', Validators.required]
    });

    // Invitations reçues
    invitations: Invitations = [];

    // Attributs nécessaires pour créer une invitation
    invitationToCreate: Invitation;
    userToInvite: User;
    planningToInvite: Planning;

    // Données personnelles de l'utilisateur
    planningsInvites: Plannings = [];
    planningsOfMember: Plannings = [];
    planningsOfGrantedMember: Plannings = [];

    private subscriptions: Subscription[] = [];

    // messages d'erreur
    userToInviteNotFoundError: boolean = false;
    userToInviteAlreadyInPlanning: boolean = false;
    userToInviteIsInvited: boolean = false;


    constructor(
        private invitationsModal: NgbModal,
        private router: Router,
        private userSessionService: UserSessionService,
        private userApi: UserApiService,
        private planningApi: PlanningApiService,
        private invitationApi: InvitationApiService,
        private memberApi: MemberApiService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.userSessionService.setUserToken();
        this.getInvitations();
        this.getPlanningsOfMember();
        this.getPlanningsOfGrantedUser();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(element => {
            element.unsubscribe()
        });
    }

    openModal(content: any) {
        this.invitationsModal.open(content, { ariaLabelledBy: 'Invitations reçues' })
    }

    joinGroup(planning: Planning) {
        const member: Member = { idUser: this.userSessionService.user.id, idPlanning: planning.id };
        this.subscriptions.push(
            this.memberApi.create(member)
                .subscribe(() => this.getInvitations())
        );
    }

    getInvitations() {
        this.subscriptions.push(
            this.invitationApi.queryFromUserRecever(this.userSessionService.user.id)
                .subscribe(
                    invitations => {
                        this.invitations = invitations;
                        this.invitations.forEach(element => {
                            this.planningApi.getById(element.idPlanning)
                                .subscribe(
                                    planning => this.planningsInvites.push(planning))
                        });
                    })
        )
    }

    getPlanningsOfMember() {
        this.subscriptions.push(
            this.memberApi.queryFromUser(this.userSessionService.user.id)
                .subscribe(
                    members => {
                        members.forEach(element => {
                            this.planningApi.getById(element.idPlanning)
                                .subscribe(
                                    planning => this.planningsOfMember.push(planning))
                        });
                        this.getPlanningBySuperUser(this.userSessionService.user.id, this.planningsOfMember);
                    }
                )
        )
    }

    getPlanningBySuperUser(id: number, plannings: Plannings) {
        this.subscriptions.push(
            this.planningApi.getBySuperUserId(id)
                .subscribe(planning => plannings.push(planning))
        )
    }

    getPlanningsOfGrantedUser() {
        this.subscriptions.push(
            this.memberApi.queryFromGrantedUser(this.userSessionService.user.id)
                .subscribe(members => {
                    members.forEach(element => {
                        this.planningApi.getById(element.idPlanning)
                            .subscribe(planning => this.planningsOfGrantedMember.push(planning))
                    });
                    this.getPlanningBySuperUser(this.userSessionService.user.id, this.planningsOfGrantedMember);
                })
        )
    }

    verifyData(cb: any) {
        this.userToInviteNotFoundError = false;
        const formUserToInvite = this.formInviteUser.controls['userEmailInvite'].value
        this.invitationToCreate = this.formInviteUser.value;

        this.subscriptions.push(
            this.userApi.getByEmail(formUserToInvite)
                .subscribe(
                    user => {
                        this.userToInvite = user;
                        this.invitationToCreate.idUserRecever = user.id;
                        return cb();
                    },
                    () => {
                        this.userToInviteNotFoundError = true;
                    }
                )
        )

    }


    createInvitation(invitation: Invitation) {
        this.userToInviteAlreadyInPlanning = false;

        this.subscriptions.push(
            this.invitationApi.create(invitation)
                .subscribe(invitation => {
                    if (invitation == null)
                        this.userToInviteAlreadyInPlanning = true;
                    else
                        this.userToInviteIsInvited = true;
                })
        )
    }

    InviteUser() {
        this.verifyData(() => {
            this.createInvitation(this.invitationToCreate);
        });
    }

    resetValidMessage() {
        this.userToInviteIsInvited = false;
    }

    logOut() {
        localStorage.removeItem("jwt");
        this.router.navigate(['/home']);
    }

}
