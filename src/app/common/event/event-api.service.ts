import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Events } from './event';
import { EventRepository } from './event-repository';

@Injectable({
    providedIn: 'root'
})
export class EventApiService implements EventRepository {

    private static URL: string = environment.serverAddress + 'api/events';

    constructor(private http: HttpClient) { }
    queryFromPlanning(id: number): Observable<Events> {
        return this.http.get<Events>(EventApiService.URL + '/' + id + "/*");
    }
    get(id: number): Observable<Event> {
        return this.http.get<Event>(EventApiService.URL + '/' + id);
    }
    create(event: Event): Observable<any> {
        return this.http.post<Event>(EventApiService.URL, event);
    }
    delete(id: number): Observable<any> {
        return this.http.delete<Event>(EventApiService.URL + '/' + id);
    }
    update(id: number, event: Event): Observable<any> {
        return this.http.put<Event>(EventApiService.URL + '/' + id, event);
    }
}
