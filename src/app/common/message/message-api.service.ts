import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Message} from "./message";
import {MessageRepository} from "./message-repository";
import {User} from "../user/user";
import {UserSessionService} from "../user/user-session.service";


@Injectable({
  providedIn: 'root'
})
export class MessageApiService implements MessageRepository{

  private static URL: string = environment.serverAddress + 'api/messages';

  constructor(private http: HttpClient, private userSession : UserSessionService) { }

  query(): Observable<Message> {
    return this.http.get<Message>(MessageApiService.URL);
  }

  queryFromChat(id: number): Observable<Message> {
    return this.http.get<Message>(MessageApiService.URL + '/' +id +'/*');
  }

  create(message: Message): Observable<Message> {

    //message.idUser = this.userSession.user.idUser;
    //message.body = "TestWS";
    message.idChat = 1;
    message.idUser = 1;
    console.log("Api"+message);
    return this.http.post<Message>(MessageApiService.URL, message);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Message>(MessageApiService.URL + '/' + id);
  }

  get(id: number): Observable<Message> {
    return this.http.get<Message>(MessageApiService.URL + '/' + id);
  }



}
