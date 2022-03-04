import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesChanged = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
    this.getMessagesHttp();
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
    this.storeMessages();
    // this.messagesChanged.emit(this.messages.slice());
  }

  getMaxId(){
    let maxId = 0;
      for(let message of this.messages){
        if(parseInt(message.id, 10) > maxId){
          maxId = parseInt(message.id, 10);
        }
      }
    return maxId;
  }

  getMessagesHttp(){
    return this.http
    .get<Message[]>('https://lucyd-cms-default-rtdb.firebaseio.com/messages.json')
    .subscribe(
      (messages:Message[] = []) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        messages.sort((a, b) => {
          if(a > b){ return 1; }
          if(a < b){ return -1; }
          else { return 0; }
         });
           let messagesListClone = this.messages.slice();
           this.messagesChanged.next(messagesListClone);
      }
      ,(error: any)=> {
        console.log(error.message)
      }
    );
  }

  storeMessages(){
    const messages = JSON.stringify(this.getMessages())
     this.http
     .put(
       'https://lucyd-cms-default-rtdb.firebaseio.com/messages.json',
     messages,
     {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }
     )
     .subscribe(()=>{
        // this.documentChangedEvent.emit(this.documents.slice()); //if something is wrong, try removing this line
        // let documentsListClone = this.documents.slice();
        this.messagesChanged.next(this.messages.slice());
     })
  }

}
