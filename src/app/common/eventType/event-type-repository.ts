import { Observable } from "rxjs";
import { EventType, EventTypes } from "./event-type";

export interface EventTypeRepository {
    query(): Observable<EventTypes>;
    getById(id: number): Observable<EventType>;
    getByLabel(label: string): Observable<EventType>;
}
