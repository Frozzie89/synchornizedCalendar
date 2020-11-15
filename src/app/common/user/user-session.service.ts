import { Injectable } from '@angular/core';
import { User } from './user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class UserSessionService {

    private _user: User;

    constructor() { }

    setUserData(token: string) {
        try {
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(token);

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
