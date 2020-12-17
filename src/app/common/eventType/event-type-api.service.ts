import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventTypes, EventType } from './event-type';
import { EventTypeRepository } from './event-type-repository';

@Injectable({
    providedIn: 'root'
})
export class EventTypeApiService implements EventTypeRepository {

    private static URL: string = environment.serverAddress + 'api/eventcategories';

    constructor(private http: HttpClient) { }
    getByLabel(label: string): Observable<EventType> {
        return this.http.get<EventType>(EventTypeApiService.URL + "/" + label);
    }
    query(): Observable<EventTypes> {
        return this.http.get<EventTypes>(EventTypeApiService.URL + "/");
    }
    getById(id: number): Observable<EventType> {
        return this.http.get<EventType>(EventTypeApiService.URL + "/" + id);
    }
}
