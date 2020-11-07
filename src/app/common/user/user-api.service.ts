import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';
import { UserRepository } from './user-repository';

@Injectable({
    providedIn: 'root'
})
export class UserApiService implements UserRepository {

    private static URL: string = environment.serverAddress + 'api/users';

    constructor(private http: HttpClient) { }

    query(): Observable<User> {
        return this.http.get<User>(UserApiService.URL);
    }

    create(user: User): Observable<User> {
        return this.http.post<User>(UserApiService.URL, user);
    }

    getById(id: number): Observable<User> {
        return this.http.get<User>(UserApiService.URL + '/' + id);
    }

    getByEmail(email: string): Observable<User> {
        return this.http.get<User>(UserApiService.URL + '/' + email);
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete<User>(UserApiService.URL + '/' + id);
    }

    deleteByEmail(email: string): Observable<any> {
        return this.http.delete<User>(UserApiService.URL + '/' + email);
    }

    updateById(id: number, user: User): Observable<any> {
        return this.http.put<User>(UserApiService.URL + '/' + id, user);
    }

    updateByEmail(email: string, user: User): Observable<any> {
        return this.http.put<User>(UserApiService.URL + '/' + email, user);
    }

}
