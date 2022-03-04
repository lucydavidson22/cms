import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  //@Output() currentMessage = new EventEmitter<void>();
  messageSender!: string;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    const contact = this.contactService.getContact(this.message.id);
    this.messageSender = contact?.name;
  }

}
