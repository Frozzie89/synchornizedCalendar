import { Observable } from 'rxjs';
import { Planning, Plannings } from './planning';

export interface PlanningRepository {
    query(): Observable<Plannings>;
    create(planning: Planning): Observable<any>;
    getById(id: number): Observable<Planning>;
    getByLabel(label: string): Observable<Planning>;
    getBySuperUserId(id: number): Observable<Planning>;
    delete(id: number): Observable<any>;
    update(id: number, planning: Planning): Observable<any>;
}
