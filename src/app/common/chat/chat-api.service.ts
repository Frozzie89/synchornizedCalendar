import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Chat } from './chat';
import { ChatRepository } from './chat-repository';

@Injectable({
    providedIn: 'root'
})
export class ChatApiService implements ChatRepository {

    private static URL: string = environment.serverAddress + 'api/chats';

    constructor(private http: HttpClient) { }

    query(): Observable<Chat> {
        return this.http.get<Chat>(ChatApiService.URL);
    }

    getById(id: number): Observable<Chat> {
        return this.http.get<Chat>(ChatApiService.URL + '/' + id);
    }

    getByIdPlanning(id: number): Observable<Chat> {
        return this.http.get<Chat>(ChatApiService.URL + '/' + id + '/planning');
    }

}
