import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SHA256 } from 'crypto-js';
import { Subscription } from 'rxjs';
import { User, Users } from 'src/app/common/user/user';
import { UserApiService } from 'src/app/common/user/user-api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    userNotFound: string = "";

    checkUser: User;
    private subscriptions: Subscription[] = [];

    formLogin: FormGroup = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    constructor(private fb: FormBuilder, private userApi: UserApiService) { }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.subscriptions.forEach(element => {
            element.unsubscribe()
        });
    }

    getAuthenticication(email: string, password: string) {
        this.subscriptions.push(
            this.userApi.getAuthentication(email, password)
                .subscribe(
                    user => {
                        this.checkUser = user
                        // rediriger vers la page des calendriers
                    },
                    () => this.userNotFound = "L'Adresse Email ou le mot de passe est incorrect"
                )
        )
    }

    submit() {
        let email = this.formLogin.controls['email'].value;
        let password = SHA256(JSON.stringify(this.formLogin.controls['password'].value)).toString().substr(0, 50);

        this.userNotFound = "";
        this.getAuthenticication(email, password);

    }

}

