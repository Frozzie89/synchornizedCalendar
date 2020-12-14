import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Invitation, Invitations } from 'src/app/common/invitation/invitation';
import { InvitationApiService } from 'src/app/common/invitation/invitation-api.service';
import { UserSessionService } from 'src/app/common/user/user-session.service';
import { Planning, Plannings } from 'src/app/common/planning/planning';
import { MemberApiService } from 'src/app/common/member/member-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/common/user/user';
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
            this.invitationApi.QueryPlanningsOfUserRecever(this.userSessionService.user.id)
                .subscribe(plannings => this.planningsInvites = plannings)
        )
    }


    getPlanningsOfMember() {
        this.subscriptions.push(
            this.memberApi.QueryPlanningsFromMember(this.userSessionService.user.id, false)
                .subscribe(plannings => this.planningsOfMember = plannings)
        )

    }

    getPlanningsOfGrantedUser() {
        this.subscriptions.push(
            this.memberApi.QueryPlanningsFromMember(this.userSessionService.user.id, true)
                .subscribe(plannings => this.planningsOfMember = plannings)

        )
    }

    sendInvitation() {
        this.userToInviteNotFoundError = false;
        const formUserToInvite = this.formInviteUser.controls['userEmailInvite'].value
        this.invitationToCreate = this.formInviteUser.value;

        this.subscriptions.push(
            this.invitationApi.create(this.invitationToCreate, formUserToInvite)
                .subscribe(
                    () => null,
                    () => this.userToInviteNotFoundError = true
                )
        )
    }

    resetValidMessage() {
        this.userToInviteIsInvited = false;
    }

    logOut() {
        localStorage.removeItem("jwt");
        this.router.navigate(['/home']);
    }
    // verifyData(cb: any) {
    //     this.userToInviteNotFoundError = false;
    //     const formUserToInvite = this.formInviteUser.controls['userEmailInvite'].value
    //     this.invitationToCreate = this.formInviteUser.value;

    //     this.subscriptions.push(
    //         this.userApi.getByEmail(formUserToInvite)
    //             .subscribe(
    //                 user => {
    //                     this.userToInvite = user;
    //                     this.invitationToCreate.idUserRecever = user.id;
    //                     return cb();
    //                 },
    //                 () => {
    //                     this.userToInviteNotFoundError = true;
    //                 }
    //             )
    //     )

    // }


    // createInvitation(invitation: Invitation) {
    //     this.userToInviteAlreadyInPlanning = false;

    //     this.subscriptions.push(
    //         this.invitationApi.create(invitation)
    //             .subscribe(invitation => {
    //                 if (invitation == null)
    //                     this.userToInviteAlreadyInPlanning = true;
    //                 else
    //                     this.userToInviteIsInvited = true;
    //             })
    //     )
    // }

    // InviteUser() {
    //     this.verifyData(() => {
    //         this.createInvitation(this.invitationToCreate);
    //     });
    // }


}
