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
  term: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.contactChangedEvent.subscribe(
      (contact:Contact[]) => {
        this.contacts = contact;
      }
    )
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(contactList => {
      console.log('Subscription updated!', contactList)
      this.contacts = contactList;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value:string){
    this.term = value;
  }

  // onContactSelected(contact: Contact){
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }
}
