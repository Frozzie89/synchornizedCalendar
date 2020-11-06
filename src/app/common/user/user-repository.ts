import { Observable } from 'rxjs';
import { User } from './user';

export interface UserRepository {
    query(): Observable<User>;
    create(user: User): Observable<any>;
    delete(id: number): Observable<any>;
    update(id: number, user: User): Observable<any>;
}
