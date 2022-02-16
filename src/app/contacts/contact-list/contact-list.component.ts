import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  private subscription: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.contactChangedEvent.subscribe(
      (contact:Contact[]) => {
        this.contacts = contact;
      }
    )
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(documentList => {
      this.contacts = documentList;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}


  // onContactSelected(contact: Contact){
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }
}
