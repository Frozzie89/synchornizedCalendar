import { Observable } from "rxjs";
import { Eventt, Eventts } from "./eventt";

export interface EventtRepository {
    queryFromPlanning(id: number): Observable<Eventts>;
    get(id: number): Observable<Event>;
    create(eventt: Eventt): Observable<any>;
    delete(id: number): Observable<any>;
    update(id: number, event: Event): Observable<any>;
}
