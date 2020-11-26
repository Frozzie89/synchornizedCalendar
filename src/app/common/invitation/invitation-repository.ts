import { Observable } from 'rxjs';
import { Invitation, Invitations } from './invitation';

export interface InvitationRepository {
    query(): Observable<Invitations>;
    queryFromUserRecever(idUserRecever: number): Observable<Invitations>;
    create(invitation: Invitation): Observable<any>;
    getById(id: number): Observable<Invitation>;
    getByUserRecever(idUserRecever: number, id: number): Observable<Invitation>;
    delete(id: number): Observable<any>;
    update(id: number, invitation: Invitation): Observable<any>;
}
