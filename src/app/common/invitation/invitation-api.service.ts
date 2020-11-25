import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invitation, Invitations } from './invitation';
import { InvitationRepository } from './invitation-repository';

@Injectable({
    providedIn: 'root'
})
export class InvitationApiService implements InvitationRepository {

    private static URL: string = environment.serverAddress + 'api/invitations';

    constructor(private http: HttpClient) { }
    query(): Observable<Invitations> {
        return this.http.get<Invitations>(InvitationApiService.URL);
    }
    queryFromUserRecever(idUserRecever: number): Observable<Invitations> {
        return this.http.get<Invitations>(InvitationApiService.URL + '/' + idUserRecever + "/*");
    }
    create(invitation: Invitation): Observable<any> {
        return this.http.post<Invitation>(InvitationApiService.URL, invitation);
    }
    getById(id: number): Observable<Invitation> {
        return this.http.get<Invitation>(InvitationApiService.URL + '/' + id);
    }
    getByUserRecever(idUserRecever: number, idPlanning: number): Observable<Invitation> {
        return this.http.get<Invitation>(InvitationApiService.URL + '/' + idUserRecever + '/' + idPlanning);
    }
    delete(id: number): Observable<any> {
        return this.http.delete<Invitation>(InvitationApiService.URL + '/' + id);
    }
    update(id: number, invitation: Invitation): Observable<any> {
        return this.http.put<Invitation>(InvitationApiService.URL + '/' + id, invitation);
    }
}
