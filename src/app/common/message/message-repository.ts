import { Observable } from 'rxjs';
import { Message } from './message';

export interface MessageRepository {
  query(): Observable<Message>;
  queryFromChat(id:number): Observable<Message>;
  get(id:number): Observable<Message>;
  create(message: Message): Observable<Message>;
  delete(id: number): Observable<any>;
}
