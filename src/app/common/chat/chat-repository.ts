import { Observable } from 'rxjs';
import { Chat } from './chat';

export interface ChatRepository {
    query(): Observable<Chat>;
    getById(id: number): Observable<Chat>;
    getByIdPlanning(id: number): Observable<Chat>;
}
