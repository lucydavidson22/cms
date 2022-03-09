import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  contacts: Contact[] = [ ];
  maxContactId: number;

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxId();
    this.getContactsHttp();
   }

   getContacts():Contact[]{
     return this.contacts.slice();
   }

   getContactsHttp(){
    return this.http
    .get<Contact[]>('https://sigora-datasave-default-rtdb.firebaseio.com/contacts.json')
    .subscribe(
      //success method
      (contacts:Contact[] = []) => {
        this.contacts = contacts;    //Assign the array of documents received to the documents property.
        this.maxContactId = this.getMaxId();  //get the maximum value used for the id property in the document list, assign the value returned to the maxDocumentId
        contacts.sort((currentElement, nextElement) => {    //Sort the list of documents by name using the sort() JavaScript array method.
          if(currentElement > nextElement){ return 1; }
          if(currentElement < nextElement){ return -1; }
          else { return 0; }
         });
           // this.documentChangedEvent.emit(this.documents.slice());   //emit the next document list change event
          //  let contactsListClone = this.contacts.slice();
          //  this.contactListChangedEvent.next(contactsListClone);
           this.contactListChangedEvent.next(this.contacts.slice());
      }
      //error method
      ,(error: any)=> {
        console.log(error.message)
      }
    );
   }

   getContact(id:string){
    for(let contact of this.contacts){
      if(id == contact.id){
        return contact;
      }
    }
    return null!;
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
    // let contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
   }

  addContact(newContact: Contact){
    if(!newContact){
      return;
    }
    this.maxContactId++;
    newContact.id= this.maxContactId + "";
    this.contacts.push(newContact);
    // let contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
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
    // let contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  storeContacts(){
    const contacts = JSON.stringify(this.getContacts())
     this.http
     .put(
       'https://sigora-datasave-default-rtdb.firebaseio.com/contacts.json',
     contacts,
     {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }
     )
     .subscribe(()=>{
        // this.documentChangedEvent.emit(this.documents.slice()); //if something is wrong, try removing this line
        // let documentsListClone = this.documents.slice();
        this.contactListChangedEvent.next(this.contacts.slice());
     })
  }
}
