import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plannings, Planning } from './planning';
import { PlanningRepository } from './planning-repository';

@Injectable({
    providedIn: 'root'
})
export class PlanningApiService implements PlanningRepository {

    private static URL: string = environment.serverAddress + 'api/plannings';


    constructor(private http: HttpClient) { }
    query(): Observable<Plannings> {
        return this.http.get<Plannings>(PlanningApiService.URL);
    }
    create(planning: Planning): Observable<any> {
        return this.http.post<Planning>(PlanningApiService.URL, planning);
    }
    getById(id: number): Observable<Planning> {
        return this.http.get<Planning>(PlanningApiService.URL + '/' + id);
    }
    getByLabel(label: string): Observable<Planning> {
        return this.http.get<Planning>(PlanningApiService.URL + '/' + label);
    }
    getBySuperUserId(id: number): Observable<Planning> {
        return this.http.get<Planning>(PlanningApiService.URL + '/' + id + "/SU");
    }
    delete(id: number): Observable<any> {
        return this.http.delete<Planning>(PlanningApiService.URL + '/' + id);

    }
    update(id: number, planning: Planning): Observable<any> {
        return this.http.put<Planning>(PlanningApiService.URL + '/' + id, planning);

    }
}
