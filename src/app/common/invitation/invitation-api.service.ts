import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plannings } from '../planning/planning';
import { Invitation, Invitations } from './invitation';
import { InvitationRepository } from './invitation-repository';

@Injectable({
    providedIn: 'root'
})
export class InvitationApiService implements InvitationRepository {

    private static URL: string = environment.serverAddress + 'api/invitations';

    constructor(private http: HttpClient) { }
    QueryPlanningsOfUserRecever(idUserRecever: number): Observable<Plannings> {
        return this.http.get<Plannings>(InvitationApiService.URL + '/' + idUserRecever + "/*");
    }
    query(): Observable<Invitations> {
        return this.http.get<Invitations>(InvitationApiService.URL);
    }
    create(invitation: Invitation, userEmail: String): Observable<any> {
        return this.http.post<Invitation>(invitation + ' / ' + userEmail, InvitationApiService.URL);
    }
    getById(id: number): Observable<Invitation> {
        return this.http.get<Invitation>(InvitationApiService.URL + '/' + id);
    }
    getByUserRecever(idUserRecever: number, id: number): Observable<Invitation> {
        return this.http.get<Invitation>(InvitationApiService.URL + '/' + idUserRecever + '/' + id);
    }
    delete(id: number): Observable<any> {
        return this.http.delete<Invitation>(InvitationApiService.URL + '/' + id);
    }
    update(id: number, invitation: Invitation): Observable<any> {
        return this.http.put<Invitation>(InvitationApiService.URL + '/' + id, invitation);
    }
}
