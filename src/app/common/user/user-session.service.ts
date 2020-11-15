import { Injectable, OnInit } from '@angular/core';
import { User } from './user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from 'src/app/app.module';

@Injectable({
    providedIn: 'root'
})
export class UserSessionService {

    private _user: User;

    constructor() { }

    setUserToken() {
        try {
            const token = tokenGetter();
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(token);

            if (token == null) {
                this.user = null;
                return;
            }

            if (helper.isTokenExpired(token))
                throw new Error("token expired");

            this.user =
            {
                idUser: decodedToken.id,
                email: decodedToken.Email,
                firstname: decodedToken.FirstName,
                lastname: decodedToken.LastName,
                username: decodedToken.UserName
            };
        }
        catch (Error) {
            console.error(Error);
            return null;
        }
    }


    clearSession() {
        this.user = null;
    }

    get user() {
        return this._user;
    }

    set user(user: User) {
        this._user = user;
    }
}
