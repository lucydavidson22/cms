import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1, 'subject 1', 'The grades for the class assignments have been posted', 'Bro. Jackson'),
    new Message(2, 'subject 2', 'When is assignment 3 due?', 'Steve Johnson'),
    new Message(3, 'subject 3', 'Assignment 3 is due on Saturday by 11:59 PM', 'Sender 3')

  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
