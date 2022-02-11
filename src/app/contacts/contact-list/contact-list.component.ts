import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.contactChangedEvent.subscribe(
      (contact:Contact[]) => {
        this.contacts = contact;
      }
    )
    this.contacts = this.contactService.getContacts();
  }

  // onContactSelected(contact: Contact){
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }
}
