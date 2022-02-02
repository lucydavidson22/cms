import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesChanged = new EventEmitter<Message[]>();
  messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
   }

  getMessages(){
    return this.messages.slice();
  }

  getMessage(id:string){
    for(let message of this.messages){
      if(id == message.id){
        return message;
      }
    }
    return null!;
  }

  addMessage(messages: Message){
    this.messages.push(messages);
    this.messagesChanged.emit(this.messages.slice());
  }


}
