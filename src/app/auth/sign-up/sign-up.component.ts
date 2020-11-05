import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    passwordStrength: string = "";
    passwordStrengthColor: string = "";
    passwordNoCapitalized: string = "";
    passwordNoNumber: string = "";
    passwordNoMatch: string = "";


    formSignUp: FormGroup = this.fb.group({
        // note : les regex de morts de veulent pas fonctionner putain jpp
        email: ['', Validators.required],
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        userName: ['', Validators.required],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required]
    });

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void { }

    submit() {
        if (this.passwordNoCapitalized == "" && this.passwordNoNumber == "" && this.passwordNoMatch == "") {
            // todo -> requête backend
        }

    }

    updatePasswordStrength() {
        const password: string = this.formSignUp.controls['password'].value;
        if (password == "") {
            this.passwordStrength = "";
            this.passwordStrengthColor = "";
        }
        else if (password.length < 5) {
            this.passwordStrength = "Faible";
            this.passwordStrengthColor = "red";
        }
        else if (password.length >= 5 && password.length < 10) {
            this.passwordStrength = "Moyen";
            this.passwordStrengthColor = "orange";
        }
        else {
            this.passwordStrength = "Fort";
            this.passwordStrengthColor = "green";
        }
    }

    checkPassword() {
        const passwordValidationNumbers = new RegExp("([0-9]{2})");
        const passwordValidationCapitalized = new RegExp("([A-Z])");
        const password: string = this.formSignUp.controls['password'].value;

        this.passwordNoNumber = "";
        this.passwordNoCapitalized = "";

        if (!passwordValidationNumbers.test(password))
            this.passwordNoNumber = "Le mot de passe doit au moins contenir deux nombres";

        if (!passwordValidationCapitalized.test(password))
            this.passwordNoCapitalized = "Le mot de passe doit au moins une majuscule";
    }

    checkPasswordMatch() {
        const password: string = this.formSignUp.controls['password'].value;
        const passwordConfirm: string = this.formSignUp.controls['passwordConfirm'].value;

        this.passwordNoMatch = (password == passwordConfirm) ? "" : "Les mots de passes doivent correspondre";
    }

}
