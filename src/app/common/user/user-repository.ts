import { Observable } from 'rxjs';
import { User } from './user';

export interface UserRepository {
    query(): Observable<User>;
    create(user: User): Observable<any>;
    getById(id: number): Observable<User>;
    getByEmail(email: string): Observable<User>;
    getAuthentication(email: string, password: string): Observable<User>;
    deleteById(id: number): Observable<any>;
    deleteByEmail(email: string): Observable<any>;
    updateById(id: number, user: User): Observable<any>;
    updateByEmail(email: string, user: User): Observable<any>;
}
