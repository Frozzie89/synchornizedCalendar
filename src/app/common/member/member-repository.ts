import { Observable } from 'rxjs';
import { Member, Members } from './member';

export interface MemberRepository {
    query(): Observable<Members>;
    queryFromPlanning(id: number): Observable<Members>;
    queryFromUser(id: number): Observable<Members>;
    queryFromGrantedUser(id: number): Observable<Members>;
    create(member: Member): Observable<any>;
    get(idUser: number, idPlanning: number): Observable<Member>;
    delete(idUser: number, idPlanning: number): Observable<any>;
    update(idUser: number, idPlanning: number, member: Member): Observable<any>;
}
