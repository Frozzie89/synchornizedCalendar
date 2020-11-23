import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageApiService} from "../../common/message/message-api.service";
import {Users} from "../../common/user/user";
import { Message, Messages } from 'src/app/common/message/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  messageToCreate : Message;
  messages: Messages = [];

  formMessage: FormGroup = this.fb.group({
    body: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private messageApi : MessageApiService) {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe()
    });
  }

  sendMessage() {
    if(this.formMessage.controls['body'].value != ' '){
      this.messageToCreate = this.formMessage.value;


      this.subscriptions.push(
        this.messageApi.create(this.messageToCreate)
          .subscribe(message => this.messages.push(message))
      );
      console.log(this.formMessage.controls['body'].value);
      console.log(this.messageToCreate);
    }else{
      console.log('Espace');
    }

  }

}
