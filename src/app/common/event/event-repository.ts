import { Observable } from "rxjs";
import { Events } from "./event";

export interface EventRepository {
    queryFromPlanning(id: number): Observable<Events>;
    get(id: number): Observable<Event>;
    create(event: Event): Observable<any>;
    delete(id: number): Observable<any>;
    update(id: number, event: Event): Observable<any>;
}
