import { Observable } from 'rxjs';
import { Member, Members } from './member';

export interface MemberRepository {
    query(): Observable<Members>;
    queryFromPlanning(idPlanning: number): Observable<Members>;
    queryFromUser(idUser: number): Observable<Members>;
    create(member: Member): Observable<any>;
    getById(idUser: number, idPlanning: number): Observable<Member>;
    delete(idUser: number, idPlanning: number): Observable<any>;
    update(idUser: number, idPlanning: number, member: Member): Observable<any>;
}
