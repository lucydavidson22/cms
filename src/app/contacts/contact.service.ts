import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [ ];

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   getContacts():Contact[]{
     return this.contacts.slice();
   }

   getContact(id:string): Contact{
    for(let contact of this.contacts){
      if(id == contact.id){
        return contact;
      }
    }
    return null!;
   }
}
