import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  contacts: Contact[] = [ ];
  maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
   }

   getContacts():Contact[]{
     return this.contacts.slice();
   }

   getContact(id:string){
    for(let contact of this.contacts){
      if(id == contact.id){
        return contact;
      }
    }
    return null!;
   }

   deleteContact(contact: Contact){
    if (!contact) {
      return;
   }
   const pos = this.contacts.indexOf(contact);
   if (pos < 0) {
      return;
   }
   this.contacts.splice(pos, 1);
  //  this.contactChangedEvent.emit(this.contacts.slice());
  let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
   }

   getMaxId(): number {
    let maxId = 0;
    for(let contact of this.contacts){
        if(parseInt(contact.id, 10) > maxId){
          maxId = parseInt(contact.id, 10);
        }
    }
    return maxId
  }

  addContact(newContact: Contact){
    if(!newContact){
      return;
    }

    this.maxContactId++;
    // let a = parseInt(newContact.id);
    newContact.id= this.maxContactId + "";
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact){
    console.log('new contact', newContact)
    if(!(originalContact || newContact)){
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if(pos < 0){
      return;
    }
    console.log("something here!");
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }
}
