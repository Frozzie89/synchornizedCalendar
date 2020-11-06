import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    private static URL: string = environment.serverAddress + 'api/users';

    constructor(private http: HttpClient) { }

    query(): Observable<User> {
        return this.http.get<User>(UserApiService.URL);
    }
    create(user: User): Observable<User> {
        return this.http.post<User>(UserApiService.URL, user);
    }
    delete(id: number): Observable<any> {
        return this.http.delete<User>(UserApiService.URL + '/' + id);

    }
    update(id: number, user: User): Observable<any> {
        return this.http.put<User>(UserApiService.URL + '/' + id, user);
    }
}
