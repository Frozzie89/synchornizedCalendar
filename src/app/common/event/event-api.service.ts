import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Eventt, Eventts } from './eventt';
import { EventtRepository } from './eventt-repository';

@Injectable({
    providedIn: 'root'
})
export class EventApiService implements EventtRepository {

    private static URL: string = environment.serverAddress + 'api/events';

    constructor(private http: HttpClient) { }
    queryFromPlanning(id: number): Observable<Eventts> {
        return this.http.get<Eventts>(EventApiService.URL + '/' + id + "/*");
    }
    get(id: number): Observable<Event> {
        return this.http.get<Event>(EventApiService.URL + '/' + id);
    }
    create(eventt: Eventt): Observable<any> {
        return this.http.post<Event>(EventApiService.URL, eventt);
    }
    delete(id: number): Observable<any> {
        return this.http.delete<Event>(EventApiService.URL + '/' + id);
    }
    update(id: number, event: Event): Observable<any> {
        return this.http.put<Event>(EventApiService.URL + '/' + id, event);
    }
}
