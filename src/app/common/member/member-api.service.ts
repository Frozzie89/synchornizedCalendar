import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Members, Member } from './member';
import { MemberRepository } from './member-repository';

@Injectable({
    providedIn: 'root'
})
export class MemberApiService implements MemberRepository {

    private static URL: string = environment.serverAddress + 'api/members';


    constructor(private http: HttpClient) { }
    query(): Observable<Members> {
        return this.http.get<Members>(MemberApiService.URL);
    }
    queryFromPlanning(idPlanning: number): Observable<Members> {
        return this.http.get<Members>(MemberApiService.URL + '/' + idPlanning + '/p');
    }
    queryFromUser(idUser: number): Observable<Members> {
        return this.http.get<Members>(MemberApiService.URL + '/' + idUser + '/u');
    }
    create(member: Member): Observable<any> {
        return this.http.post<Member>(MemberApiService.URL, member);
    }
    getById(idUser: number, idPlanning: number): Observable<Member> {
        return this.http.get<Member>(MemberApiService.URL + '/' + idUser + '/' + idPlanning);
    }
    delete(idUser: number, idPlanning: number): Observable<any> {
        return this.http.delete<Member>(MemberApiService.URL + '/' + idUser + '/' + idPlanning);
    }
    update(idUser: number, idPlanning: number, member: Member): Observable<any> {
        return this.http.put<Member>(MemberApiService.URL + '/' + idUser + '/' + idPlanning, member);
    }
}
