import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', { static: false }) subjectInputRef!: ElementRef;
  @ViewChild('msgText', { static: false }) msgInputRef!: ElementRef;
  // @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = 'Lucy';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void { }

  onSendMessage(){
    let subject = this.subjectInputRef.nativeElement.value;
    let msgText = this.msgInputRef.nativeElement.value;
    let newMsgText = new Message('21', subject, msgText, this.currentSender);
    this.messageService.addMessage(newMsgText);
  }

  onClear(){
    this.subjectInputRef.nativeElement.value = ' ';
    this.msgInputRef.nativeElement.value = ' ';

  }

}
