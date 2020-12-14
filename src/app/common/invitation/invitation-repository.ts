import { Observable } from 'rxjs';
import { Plannings } from '../planning/planning';
import { Invitation, Invitations } from './invitation';

export interface InvitationRepository {
    query(): Observable<Invitations>;
    // queryFromUserRecever(idUserRecever: number): Observable<Invitations>;
    QueryPlanningsOfUserRecever(idUserRecever: number): Observable<Plannings>;
    // create(invitation: Invitation): Observable<any>;
    create(invitation: Invitation, userEmail: string): Observable<any>;
    getById(id: number): Observable<Invitation>;
    getByUserRecever(idUserRecever: number, id: number): Observable<Invitation>;

    delete(id: number): Observable<any>;
    update(id: number, invitation: Invitation): Observable<any>;
}
