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
    // this.messages = MOCKMESSAGES;
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

  // addMessage(messages: Message){
  //   this.messages.push(messages);
  //   this.storeMessages();
  // }

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
    // .get<Message[]>('https://lucyd-cms-default-rtdb.firebaseio.com/messages.json')
    .get<Message[]>('http://localhost:3000/messages')
    .subscribe(
      (messages:Message[]) => {
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

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    // make sure id of the new Message is empty
    message.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ messages: string, message: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new message to messages
          this.messages.push(responseData.message);
        // this.messagesChanged.next(this.messages.slice());
        }
      );
  }

}
